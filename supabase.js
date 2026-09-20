(function () {
  "use strict";

  const url = window.TRIPFLOW_SUPABASE_URL || "";
  const key = window.TRIPFLOW_SUPABASE_ANON_KEY || "";
  const configured = Boolean(
    window.supabase && url && key &&
    !url.startsWith("SEM_") && !key.startsWith("SEM_")
  );
  const client = configured
    ? window.supabase.createClient(url, key, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      })
    : null;

  let session = null;
  let channel = null;
  let listener = () => {};
  const versions = new Map();
  const roles = new Map();

  const notify = (type, detail = {}) => listener({ type, ...detail });
  const requireClient = () => {
    if (!client) throw new Error("Supabase není nakonfigurovaný.");
    return client;
  };
  const requireUser = () => {
    if (!session?.user) throw new Error("Nejdřív se přihlaste.");
    return session.user;
  };

  async function init(onEvent) {
    listener = typeof onEvent === "function" ? onEvent : listener;
    if (!client) {
      notify("unconfigured");
      return null;
    }
    const { data, error } = await client.auth.getSession();
    if (error) notify("error", { error });
    session = data?.session || null;
    client.auth.onAuthStateChange((event, nextSession) => {
      session = nextSession;
      window.setTimeout(() => notify("auth", { event, session }), 0);
    });
    notify("ready", { session });
    return session;
  }

  async function signIn(email) {
    const { error } = await requireClient().auth.signInWithOtp({
      email: String(email || "").trim(),
      options: { shouldCreateUser: true }
    });
    if (error) throw error;
  }

  async function verifyEmailOtp(email, token) {
    const result = await requireClient().auth.verifyOtp({
      email: String(email || "").trim(),
      token: String(token || "").replace(/\s/g, ""),
      type: "email"
    });
    if (result.error) throw result.error;
    session = result.data.session;
    return session;
  }

  async function signOut() {
    stopRealtime();
    const { error } = await requireClient().auth.signOut();
    if (error) throw error;
    session = null;
    versions.clear();
    roles.clear();
  }

  async function loadTrips() {
    const user = requireUser();
    const [tripResult, memberResult, stateResult] = await Promise.all([
      client.from("tripflow_trips").select("id,data,owner_id,version,updated_at").order("updated_at", { ascending: false }),
      client.from("tripflow_members").select("trip_id,role").eq("user_id", user.id),
      client.from("tripflow_stop_states").select("trip_id,stop_id,done,reserved,updated_at")
    ]);
    if (tripResult.error) throw tripResult.error;
    if (memberResult.error) throw memberResult.error;
    if (stateResult.error) throw stateResult.error;
    roles.clear();
    (memberResult.data || []).forEach(item => roles.set(item.trip_id, item.role));
    versions.clear();
    const trips = (tripResult.data || []).map(row => {
      versions.set(row.id, Number(row.version));
      return { ...(row.data || {}), id: row.id };
    });
    const stopStates = {};
    (stateResult.data || []).forEach(item => {
      stopStates[`${item.trip_id}:${item.stop_id}`] = { done: item.done, reserved: item.reserved };
    });
    return { trips, stopStates };
  }

  async function createTrip(trip) {
    const user = requireUser();
    const id = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(trip.id)
      ? trip.id
      : crypto.randomUUID();
    const data = { ...trip, id };
    let result = await client.from("tripflow_trips")
      .insert({ id, owner_id: user.id, data })
      .select("id,data,version").single();
    if (result.error?.code === "23505") {
      result = await client.from("tripflow_trips")
        .select("id,data,version").eq("id", id).single();
    }
    if (result.error) throw result.error;
    versions.set(id, Number(result.data.version));
    roles.set(id, "owner");
    return { ...result.data.data, id };
  }

  async function importTrips(trips) {
    const imported = [];
    for (const source of trips) {
      const copy = JSON.parse(JSON.stringify(source));
      delete copy._cloud;
      copy.id = crypto.randomUUID();
      for (const day of copy.days || []) {
        for (const stop of day.stops || []) stop.id ||= crypto.randomUUID();
      }
      imported.push(await createTrip(copy));
    }
    return imported;
  }

  async function saveTrip(trip, retry = true) {
    requireUser();
    const expectedVersion = versions.get(trip.id);
    if (!expectedVersion) throw new Error("Chybí verze cloudové cesty. Obnovte data.");
    const clean = JSON.parse(JSON.stringify({ ...trip, id: trip.id }));
    const result = await client.rpc("tripflow_save_trip", {
      p_trip_id: trip.id,
      p_data: clean,
      p_expected_version: expectedVersion
    });
    if (result.error) {
      if (retry && (result.error.code === "40001" || result.error.message?.includes("trip_conflict"))) {
        const latest = await client.from("tripflow_trips").select("version").eq("id", trip.id).single();
        if (latest.error) throw latest.error;
        versions.set(trip.id, Number(latest.data.version));
        return saveTrip(trip, false);
      }
      throw result.error;
    }
    const row = Array.isArray(result.data) ? result.data[0] : result.data;
    versions.set(trip.id, Number(row.new_version));
    return row;
  }

  async function deleteTrip(tripId) {
    const result = await requireClient().from("tripflow_trips").delete().eq("id", tripId);
    if (result.error) throw result.error;
    versions.delete(tripId);
    roles.delete(tripId);
  }

  async function setStopState(tripId, stopId, values) {
    const user = requireUser();
    const payload = {
      trip_id: tripId,
      stop_id: stopId,
      updated_by: user.id,
      updated_at: new Date().toISOString(),
      ...values
    };
    const result = await client.from("tripflow_stop_states")
      .upsert(payload, { onConflict: "trip_id,stop_id" });
    if (result.error) throw result.error;
  }

  async function createInvitation(tripId, email, role) {
    const user = requireUser();
    const token = crypto.randomUUID();
    const payload = {
      trip_id: tripId,
      token,
      email: String(email || "").trim().toLowerCase() || null,
      role: role === "viewer" ? "viewer" : "editor",
      created_by: user.id
    };
    const result = await client.from("tripflow_invitations").insert(payload);
    if (result.error) throw result.error;
    const inviteUrl = new URL(window.location.href);
    inviteUrl.hash = "";
    inviteUrl.search = "";
    inviteUrl.searchParams.set("invite", token);
    return inviteUrl.toString();
  }

  async function acceptInvitation(token) {
    requireUser();
    const result = await client.rpc("tripflow_accept_invitation", { p_token: token });
    if (result.error) throw result.error;
    return result.data;
  }

  async function getMembers(tripId) {
    const result = await requireClient().from("tripflow_members")
      .select("user_id,role,email,created_at").eq("trip_id", tripId).order("created_at");
    if (result.error) throw result.error;
    return result.data || [];
  }

  async function updateMember(tripId, userId, role) {
    const result = await requireClient().from("tripflow_members")
      .update({ role: role === "viewer" ? "viewer" : "editor" })
      .eq("trip_id", tripId).eq("user_id", userId);
    if (result.error) throw result.error;
  }

  async function removeMember(tripId, userId) {
    const result = await requireClient().from("tripflow_members")
      .delete().eq("trip_id", tripId).eq("user_id", userId);
    if (result.error) throw result.error;
  }

  function safeFileName(value) {
    return String(value || "soubor").normalize("NFKD")
      .replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(-100) || "soubor";
  }

  async function listDocuments(tripId) {
    const result = await requireClient().from("tripflow_documents")
      .select("id,trip_id,stop_id,name,storage_path,mime_type,size_bytes,created_at")
      .eq("trip_id", tripId).order("created_at", { ascending: false });
    if (result.error) throw result.error;
    return result.data || [];
  }

  async function uploadDocument(tripId, file, stopId = null) {
    const user = requireUser();
    if (!file || file.size > 20 * 1024 * 1024) throw new Error("Soubor může mít nejvýše 20 MB.");
    const path = `${tripId}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
    const upload = await client.storage.from("tripflow-documents").upload(path, file, {
      cacheControl: "3600", upsert: false, contentType: file.type || "application/octet-stream"
    });
    if (upload.error) throw upload.error;
    const inserted = await client.from("tripflow_documents").insert({
      trip_id: tripId,
      stop_id: stopId || null,
      name: file.name,
      storage_path: path,
      mime_type: file.type || null,
      size_bytes: file.size,
      created_by: user.id
    }).select().single();
    if (inserted.error) {
      await client.storage.from("tripflow-documents").remove([path]);
      throw inserted.error;
    }
    return inserted.data;
  }

  async function getDocumentUrl(path) {
    const result = await requireClient().storage.from("tripflow-documents").createSignedUrl(path, 60);
    if (result.error) throw result.error;
    return result.data.signedUrl;
  }

  async function deleteDocument(document) {
    const metadata = await requireClient().from("tripflow_documents").delete().eq("id", document.id);
    if (metadata.error) throw metadata.error;
    const stored = await client.storage.from("tripflow-documents").remove([document.storage_path]);
    if (stored.error) throw stored.error;
  }

  function startRealtime() {
    stopRealtime();
    if (!client || !session) return;
    channel = client.channel(`tripflow-${session.user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "tripflow_trips" }, payload => {
        if (payload.new?.id && payload.new?.version) versions.set(payload.new.id, Number(payload.new.version));
        notify("trip-change", { payload });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "tripflow_stop_states" }, payload => {
        notify("stop-state-change", { payload });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "tripflow_documents" }, payload => {
        notify("document-change", { payload });
      })
      .subscribe(status => notify("realtime", { status }));
  }

  function stopRealtime() {
    if (client && channel) client.removeChannel(channel);
    channel = null;
  }

  window.TripFlowCloud = {
    configured, client, init, signIn, verifyEmailOtp, signOut, loadTrips, createTrip, importTrips,
    saveTrip, deleteTrip, setStopState, createInvitation, acceptInvitation,
    getMembers, updateMember, removeMember, listDocuments, uploadDocument,
    getDocumentUrl, deleteDocument, startRealtime, stopRealtime,
    roleFor: tripId => roles.get(tripId) || null,
    canEdit: tripId => ["owner", "editor"].includes(roles.get(tripId)),
    isOwner: tripId => roles.get(tripId) === "owner",
    getSession: () => session
  };
})();
