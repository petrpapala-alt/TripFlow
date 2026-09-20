const DEFAULT_TRIPS = [
  {
    id: "rome-2026",
    city: "Řím",
    country: "Itálie",
    dates: "12.–15. 10. 2026",
    travelers: "2 dospělí",
    stay: "198 Via Aurelia, Roma",
    budget: [
      { category: "Letenky", amount: 0, currency: "CZK", paid: true },
      { category: "Ubytování", amount: 0, currency: "CZK", paid: true },
      { category: "Vstupy", amount: 0, currency: "EUR", paid: false },
      { category: "Doprava", amount: 0, currency: "EUR", paid: false }
    ],
    days: [
      {
        date: "Po 12. 10.",
        title: "Barokní centrum",
        distance: "1,8 km",
        walk: "25–30 min",
        total: "cca 4 h 30 min",
        photo: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
        stops: [
          { time: "11:05", name: "Přílet Fiumicino", address: "Aeroporto di Roma Fiumicino", type: "transport", price: "Taxi dle cíle", note: "Oficiální bílé taxi, cenu potvrdit před nástupem." },
          { time: "15:30", name: "Piazza Navona", address: "Piazza Navona, 00186 Roma RM", type: "sight", price: "Zdarma" },
          { time: "16:30", name: "Pantheon", address: "Piazza della Rotonda, 00186 Roma RM", type: "ticket", price: "7 €", booking: "https://direzionemuseiroma.cultura.gov.it/en/pantheon/", reservationRequired: false, reserved: false, note: "Rezervace doporučena." },
          { time: "17:30", name: "Fontána di Trevi", address: "Piazza di Trevi, 00187 Roma RM", type: "sight", price: "2 € u nádrže", booking: "https://www.turismoroma.it/en/news/trevi-fountain-new-entry-fee-one-romes-symbols" },
          { time: "večer", name: "Španělské schody", address: "Piazza di Spagna, 00187 Roma RM", type: "sight", price: "Zdarma" }
        ]
      },
      {
        date: "Út 13. 10.",
        title: "Vatikán",
        distance: "2,5 km",
        walk: "35–40 min",
        total: "cca 10 h 30 min",
        photo: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1200&q=80",
        stops: [
          { time: "08:00", name: "Vatikánská muzea", address: "Viale Vaticano, 00165 Roma RM", type: "ticket", price: "25 € online", booking: "https://tickets.museivaticani.va/home", reservationRequired: true, reserved: false, note: "Pevná rezervace." },
          { time: "12:30", name: "Oběd Borgo / Prati", address: "Borgo Pio, Roma", type: "food", price: "Dle výběru" },
          { time: "14:00", name: "Bazilika sv. Petra", address: "Piazza San Pietro, 00120 Città del Vaticano", type: "sight", price: "Bazilika zdarma", booking: "https://www.basilicasanpietro.va/en/opening-hours", note: "Kupole podle energie." },
          { time: "16:20", name: "Andělský hrad", address: "Lungotevere Castello, 50, 00193 Roma RM", type: "ticket", price: "18 €", booking: "https://direzionemuseiroma.cultura.gov.it/museo-nazionale-di-castel-santangelo/" }
        ]
      },
      {
        date: "St 14. 10.",
        title: "Antický Řím",
        distance: "4,0 km",
        walk: "55–65 min",
        total: "celodenní program",
        photo: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
        stops: [
          { time: "08:30", name: "Koloseum", address: "Piazza del Colosseo, 1, 00184 Roma RM", type: "ticket", price: "18 € včetně Fora a Palatinu", booking: "https://ticketing.colosseo.it/en/", reservationRequired: true, reserved: false, note: "Časový vstup povinný." },
          { time: "10:20", name: "Forum Romanum", address: "Via della Salara Vecchia, 5/6, Roma", type: "sight", price: "V ceně" },
          { time: "poté", name: "Palatin", address: "Via di San Gregorio, 30, Roma", type: "sight", price: "V ceně" },
          { time: "13:30", name: "Oběd v Monti", address: "Rione Monti, Roma", type: "food", price: "Dle výběru" },
          { time: "15:30", name: "Circo Massimo", address: "Via del Circo Massimo, Roma", type: "sight", price: "Zdarma" },
          { time: "18:00", name: "Trastevere", address: "Piazza di Santa Maria in Trastevere", type: "food", price: "Večeře dle výběru" }
        ]
      },
      {
        date: "Čt 15. 10.",
        title: "Aventin a starý Řím",
        distance: "4,5 km",
        walk: "60–70 min",
        total: "do odjezdu v 17:30",
        photo: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80",
        stops: [
          { time: "08:30", name: "Orange Garden", address: "Piazza Pietro D’Illiria, 00153 Roma RM", type: "sight", price: "Zdarma" },
          { time: "poté", name: "Santa Sabina", address: "Piazza Pietro d’Illiria, 1, Roma", type: "sight", price: "Zdarma" },
          { time: "poté", name: "Aventinský klíčový otvor", address: "Piazza dei Cavalieri di Malta, 3, Roma", type: "sight", price: "Zdarma" },
          { time: "11:15", name: "Trastevere", address: "Piazza di Santa Maria in Trastevere", type: "food", price: "Oběd dle výběru" },
          { time: "12:45", name: "Campo de’ Fiori", address: "Campo de’ Fiori, 00186 Roma RM", type: "sight", price: "Zdarma" },
          { time: "poté", name: "Židovská čtvrť", address: "Via del Portico d’Ottavia, Roma", type: "sight", price: "Zdarma" },
          { time: "konec", name: "Teatro Marcello", address: "Via del Teatro di Marcello, Roma", type: "sight", price: "Exteriér zdarma" },
          { time: "17:30", name: "Taxi na Fiumicino", address: "Aeroporto di Roma Fiumicino", type: "transport", price: "Dle cíle", note: "Odlet 21:25." }
        ]
      }
    ]
  }
];

const readJson = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; }
  catch { return fallback; }
};
const makeId = prefix => `${prefix}-${crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;
const safeId = (value, prefix) => /^[a-zA-Z0-9_-]{1,128}$/.test(String(value || "")) ? String(value) : makeId(prefix);
const normalizeTrips = trips => (Array.isArray(trips) ? trips : []).map(trip => ({
  ...trip,
  id: safeId(trip.id, "trip"),
  budget: Array.isArray(trip.budget) ? trip.budget : [],
  days: (Array.isArray(trip.days) ? trip.days : []).map(day => ({
    ...day,
    stops: (Array.isArray(day.stops) ? day.stops : []).map(stop => ({ ...stop, id: safeId(stop.id, "stop") }))
  }))
}));

const state = {
  trips: normalizeTrips(readJson("tripflow.trips", DEFAULT_TRIPS)),
  tripId: localStorage.getItem("tripflow.tripId") || "rome-2026",
  day: 0,
  tab: "plan",
  query: "",
  done: readJson("tripflow.done", {}),
  stopStates: readJson("tripflow.stopStates", {}),
  dirtyTrips: new Set(readJson("tripflow.dirtyTrips", [])),
  dirtyStopStates: new Set(readJson("tripflow.dirtyStopStates", [])),
  pendingCreates: new Set(readJson("tripflow.pendingCreates", [])),
  syncedUser: localStorage.getItem("tripflow.syncedUser") || "",
  deferred: null,
  documents: [],
  cloud: {
    session: null,
    status: window.TripFlowCloud?.configured ? "connecting" : "unconfigured",
    message: "",
    loadPromise: null,
    saveTimers: new Map()
  }
};

const qs = selector => document.querySelector(selector);
const saveLocal = () => {
  localStorage.setItem("tripflow.trips", JSON.stringify(state.trips));
  localStorage.setItem("tripflow.tripId", state.tripId || "");
  localStorage.setItem("tripflow.done", JSON.stringify(state.done));
  localStorage.setItem("tripflow.stopStates", JSON.stringify(state.stopStates));
  localStorage.setItem("tripflow.dirtyTrips", JSON.stringify([...state.dirtyTrips]));
  localStorage.setItem("tripflow.dirtyStopStates", JSON.stringify([...state.dirtyStopStates]));
  localStorage.setItem("tripflow.pendingCreates", JSON.stringify([...state.pendingCreates]));
  if (state.syncedUser) localStorage.setItem("tripflow.syncedUser", state.syncedUser);
};
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));
const safeExternalUrl = value => {
  if (!value) return "";
  try {
    const parsed = new URL(String(value || ""), window.location.href);
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : "#";
  } catch { return "#"; }
};
const currentTrip = () => state.trips.find(t => t.id === state.tripId) || state.trips[0];
const currentDay = () => currentTrip()?.days?.[state.day] || currentTrip()?.days?.[0];
const cloud = () => window.TripFlowCloud;
const isSignedIn = () => Boolean(state.cloud.session?.user);
const canEdit = (tripId = state.tripId) => !isSignedIn() || state.pendingCreates.has(tripId) || cloud().canEdit(tripId);
const isOwner = (tripId = state.tripId) => isSignedIn() && (state.pendingCreates.has(tripId) || cloud().isOwner(tripId));
const stopStateKey = (tripId, stopId) => `${tripId}:${stopId}`;
const stopStatus = (stop, dayIndex = state.day) => {
  const shared = state.stopStates[stopStateKey(state.tripId, stop.id)] || {};
  const legacyKey = `${state.tripId}-${dayIndex}-${stop.name}`;
  return { done: shared.done ?? Boolean(state.done[legacyKey]), reserved: shared.reserved ?? Boolean(stop.reserved) };
};

function errorText(error) {
  const message = error?.message || String(error || "Neznámá chyba");
  if (message.includes("relation") && message.includes("does not exist")) return "V Supabase ještě není nahrané databázové schéma.";
  if (message.includes("Failed to fetch")) return "Cloud není dostupný. Změny zůstaly uložené v zařízení.";
  if (message.includes("invitation_email_mismatch")) return "Pozvánka je určená pro jiný e-mail.";
  if (message.includes("invitation_invalid_or_expired")) return "Pozvánka už byla použitá nebo vypršela.";
  return message;
}

function toast(message, kind = "info") {
  qs("#toast")?.remove();
  document.body.insertAdjacentHTML("beforeend", `<div id="toast" class="toast ${kind}">${escapeHtml(message)}</div>`);
  window.setTimeout(() => qs("#toast")?.remove(), 4200);
}

function markTripChanged(tripId = state.tripId) {
  state.dirtyTrips.add(tripId);
  saveLocal();
  if (!isSignedIn() || !cloud().canEdit(tripId)) return;
  const previous = state.cloud.saveTimers.get(tripId);
  if (previous) clearTimeout(previous);
  state.cloud.status = navigator.onLine ? "syncing" : "offline";
  state.cloud.saveTimers.set(tripId, setTimeout(() => syncTrip(tripId), 500));
  render();
}

async function syncTrip(tripId) {
  state.cloud.saveTimers.delete(tripId);
  if (!isSignedIn() || !navigator.onLine || !state.dirtyTrips.has(tripId)) return;
  const trip = state.trips.find(item => item.id === tripId);
  if (!trip || !cloud().canEdit(tripId)) return;
  try {
    state.cloud.status = "syncing";
    render();
    await cloud().saveTrip(trip);
    state.dirtyTrips.delete(tripId);
    state.cloud.status = "synced";
    state.cloud.message = "";
    saveLocal();
    render();
  } catch (error) {
    state.cloud.status = navigator.onLine ? "error" : "offline";
    state.cloud.message = errorText(error);
    saveLocal();
    render();
  }
}

async function syncPendingCreate(tripId) {
  if (!isSignedIn() || !navigator.onLine || !state.pendingCreates.has(tripId)) return;
  const trip = state.trips.find(item => item.id === tripId);
  if (!trip) { state.pendingCreates.delete(tripId); saveLocal(); return; }
  try {
    state.cloud.status = "syncing";
    render();
    await cloud().createTrip(trip);
    state.pendingCreates.delete(tripId);
    state.cloud.status = "synced";
    state.cloud.message = "";
    saveLocal();
  } catch (error) {
    state.cloud.status = navigator.onLine ? "error" : "offline";
    state.cloud.message = errorText(error);
    saveLocal(); render();
  }
}

async function syncStopState(key) {
  if (!isSignedIn() || !navigator.onLine || !state.dirtyStopStates.has(key)) return;
  const separator = key.indexOf(":");
  const tripId = key.slice(0, separator);
  const stopId = key.slice(separator + 1);
  if (!cloud().canEdit(tripId)) return;
  try {
    await cloud().setStopState(tripId, stopId, state.stopStates[key]);
    state.dirtyStopStates.delete(key);
    saveLocal();
  } catch (error) {
    state.cloud.status = navigator.onLine ? "error" : "offline";
    state.cloud.message = errorText(error);
    render();
  }
}

async function flushPending() {
  for (const tripId of [...state.pendingCreates]) await syncPendingCreate(tripId);
  for (const key of [...state.dirtyStopStates]) await syncStopState(key);
  for (const tripId of [...state.dirtyTrips]) await syncTrip(tripId);
}

function routeUrl(day = currentDay()) {
  if (!day) return "#";
  const stops = day.stops.filter(item => item.address);
  if (stops.length < 2) return "#";
  const origin = encodeURIComponent(stops[0].address);
  const destination = encodeURIComponent(stops.at(-1).address);
  const waypoints = stops.slice(1, -1).map(item => encodeURIComponent(item.address)).join("%7C");
  return `https://www.google.com/maps/dir/?api=1&travelmode=walking&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
}

function header() {
  const trip = currentTrip();
  if (!trip) return `<header class="hero"><div class="brand">TripFlow</div><h1>Moje cesty</h1></header>`;
  return `
    <header class="hero">
      <div class="spread">
        <div>
          <div class="brand">TripFlow</div>
          <h1>${escapeHtml(trip.city)}</h1>
          <div class="sub">${escapeHtml(trip.dates)} · ${escapeHtml(trip.travelers)}</div>
        </div>
        <div class="header-actions">
          <button class="btn secondary icon account-button" onclick="showAccount()" aria-label="Účet">${isSignedIn() ? "☁" : "♙"}</button>
          <button class="btn secondary icon" onclick="showTools()" aria-label="Nástroje">⋯</button>
        </div>
      </div>
      <div class="hero-grid">
        <div class="hero-chip">🏨<b>${escapeHtml(trip.stay)}</b></div>
        <div class="hero-chip">📅<b>${trip.days.length} dny programu</b></div>
      </div>
    </header>`;
}

function navigation() {
  const items = [
    ["plan", "🗓", "Plán"], ["map", "🗺", "Trasa"],
    ["database", "◫", "Přehled"], ["trips", "✈️", "Cesty"]
  ];
  return `<nav class="nav">${items.map(item => `
    <button class="${state.tab === item[0] ? "active" : ""}" onclick="setTab('${item[0]}')">
      <span>${item[1]}</span>${item[2]}
    </button>`).join("")}
    <button onclick="newTrip()"><span>＋</span>Nová</button>
  </nav>`;
}

function stopCard(stop, index) {
  const status = stopStatus(stop);
  const edit = canEdit() ? `<button class="btn secondary icon" onclick="editStop(${index})" aria-label="Upravit zastávku">✎</button>` : "";
  const documentButton = isSignedIn() ? `<button class="link button-link" onclick="showDocuments('${stop.id}')">Dokumenty</button>` : "";
  const booking = stop.booking
    ? `<a class="link" href="${escapeHtml(safeExternalUrl(stop.booking))}" target="_blank" rel="noopener">Rezervace ↗</a>` : "";
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.address)}`;
  return `<article class="stop ${status.done ? "done" : ""}">
    <button class="check" ${canEdit() ? `onclick="toggleDone('${stop.id}')"` : "disabled"}>${status.done ? "✓" : ""}</button>
    <div>
      <div class="spread"><div><div class="time">${escapeHtml(stop.time)}</div><h3>${escapeHtml(stop.name)}</h3></div>
      ${edit}</div>
      <div class="address">📍 ${escapeHtml(stop.address)}</div>
      <div class="tags"><span class="tag">💳 ${escapeHtml(stop.price || "neuvedeno")}</span>${booking}
      <a class="link" href="${map}" target="_blank" rel="noopener">Navigovat ↗</a>${documentButton}</div>
      ${stop.note ? `<div class="note">${escapeHtml(stop.note)}</div>` : ""}
    </div>
  </article>`;
}

function renderPlan() {
  const trip = currentTrip();
  const day = currentDay();
  if (!trip || !day) return `${header()}<section class="panel"><div class="empty">Zatím tu není žádná cesta.</div></section>${navigation()}`;
  const stops = day.stops.map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) => `${item.name} ${item.address}`.toLowerCase().includes(state.query.toLowerCase()));
  return `${header()}<section class="pad">
    ${syncBanner()}
    <button id="installBtn" class="btn install" onclick="installPWA()">Přidat TripFlow na plochu</button>
    <div class="days">${trip.days.map((item, index) => `<button class="day-btn ${index === state.day ? "active" : ""}" onclick="setDay(${index})"><small>${escapeHtml(item.date)}</small><b>Den ${index + 1}</b></button>`).join("")}</div>
    <div class="cover"><img src="${escapeHtml(safeExternalUrl(day.photo))}" alt="${escapeHtml(day.title)}" onerror="this.style.display='none'">
      <div class="cover-title"><small>${escapeHtml(day.date)}</small><h2>${escapeHtml(day.title)}</h2></div></div>
    <div class="metrics"><div class="metric"><b>${escapeHtml(day.distance)}</b><small>trasa</small></div>
      <div class="metric"><b>${escapeHtml(day.walk)}</b><small>čistá chůze</small></div>
      <div class="metric"><b>${escapeHtml(day.total)}</b><small>celkem</small></div></div>
    <div class="toolbar"><input class="search" value="${escapeHtml(state.query)}" oninput="searchStops(this.value)" placeholder="Najít zastávku">
      <a class="btn icon" href="${routeUrl()}" target="_blank" rel="noopener">➤</a></div>
    ${stops.map(({ item, originalIndex }) => stopCard(item, originalIndex)).join("")}
    <div class="offline">Změny se vždy nejdřív uloží do zařízení${isSignedIn() ? " a po připojení se synchronizují" : ""}.</div>
  </section>${navigation()}`;
}

function renderMap() {
  const day = currentDay();
  if (!day) return `${header()}<section class="panel"><div class="empty">Nejdřív vytvořte cestu.</div></section>${navigation()}`;
  return `${header()}<section class="panel"><h2 class="section-title">${escapeHtml(day.title)}</h2>
    <div class="metrics"><div class="metric"><b>${escapeHtml(day.distance)}</b><small>trasa</small></div>
    <div class="metric"><b>${escapeHtml(day.walk)}</b><small>chůze</small></div><div class="metric"><b>${day.stops.length}</b><small>zastávek</small></div></div>
    <div class="route-list">${day.stops.map(item => `<div class="route-item"><b>${escapeHtml(item.time)} · ${escapeHtml(item.name)}</b><small>${escapeHtml(item.address)}</small></div>`).join("")}</div>
    <a class="btn rust" style="display:block;text-align:center;text-decoration:none" target="_blank" rel="noopener" href="${routeUrl()}">Otevřít celou trasu v Google Maps</a>
  </section>${navigation()}`;
}

function renderDatabase() {
  const trip = currentTrip();
  if (!trip) return `${header()}<section class="panel"><div class="empty">Nejdřív vytvořte cestu.</div></section>${navigation()}`;
  const all = trip.days.flatMap((day, dayIndex) => day.stops.map((stop, stopIndex) => ({ ...stop, dayIndex, stopIndex, day: day.date })));
  const required = all.filter(item => item.reservationRequired);
  const reserved = required.filter(item => stopStatus(item, item.dayIndex).reserved).length;
  const budget = trip.budget || [];
  return `${header()}<section class="panel"><h2 class="section-title">Cestovní databáze</h2>
    <div class="metrics"><div class="metric"><b>${trip.days.length}</b><small>dnů</small></div>
    <div class="metric"><b>${all.length}</b><small>zastávek</small></div><div class="metric"><b>${reserved}/${required.length}</b><small>rezervací</small></div></div>
    <h3>Rezervace</h3>${required.map(item => { const status = stopStatus(item, item.dayIndex); return `<article class="stop ${status.reserved ? "done" : ""}"><button class="check" ${canEdit() ? `onclick="toggleReserved(${item.dayIndex},${item.stopIndex})"` : "disabled"}>${status.reserved ? "✓" : ""}</button><div><div class="time">${escapeHtml(item.day)} · ${escapeHtml(item.time)}</div><h3>${escapeHtml(item.name)}</h3><div class="address">${status.reserved ? "Rezervováno" : "Čeká na rezervaci"}</div>${item.booking ? `<div class="tags"><a class="link" href="${escapeHtml(safeExternalUrl(item.booking))}" target="_blank" rel="noopener">Otevřít rezervaci ↗</a></div>` : ""}</div></article>`; }).join("") || '<div class="empty">Žádné povinné rezervace.</div>'}
    <div class="spread budget-heading"><h3>Rozpočet</h3>${canEdit() ? '<button class="btn secondary" onclick="editBudget()">Upravit</button>' : ""}</div>${budget.map(item => `<div class="trip-card"><div class="trip-body spread"><div><b>${escapeHtml(item.category)}</b><div class="address">${item.paid ? "Zaplaceno" : "Nezaplaceno"}</div></div><strong>${Number(item.amount || 0).toLocaleString("cs-CZ")} ${escapeHtml(item.currency)}</strong></div></div>`).join("") || '<div class="empty">Rozpočet zatím není vyplněn.</div>'}
  </section>${navigation()}`;
}

function renderTrips() {
  return `${header()}<section class="panel">${syncBanner()}<div class="spread"><h2 class="section-title">Moje cesty</h2><button class="btn rust" onclick="newTrip()">＋ Nová</button></div>
  ${state.trips.map(item => `<article class="trip-card"><div class="trip-banner"></div><div class="trip-body"><div class="spread"><div><h3>${escapeHtml(item.city)}, ${escapeHtml(item.country)}</h3><div class="address">${escapeHtml(item.dates)} · ${(item.days || []).length} dny · ${escapeHtml(cloud().roleFor(item.id) || (isSignedIn() ? "" : "v zařízení"))}</div></div><button class="btn" onclick="openTrip('${item.id}')">Otevřít</button></div></div></article>`).join("") || '<div class="empty">Zatím tu není žádná cesta.</div>'}</section>${navigation()}`;
}

function syncBanner() {
  const values = {
    unconfigured: ["local", "Pouze v zařízení · Supabase není nastavený"],
    connecting: ["syncing", "Připojuji cloud…"],
    local: ["local", "Pouze v zařízení · přihlaste se pro synchronizaci"],
    syncing: ["syncing", "Synchronizuji…"],
    synced: ["synced", `Synchronizováno · ${state.cloud.session?.user?.email || ""}`],
    offline: ["offline", "Offline · změny čekají v zařízení"],
    error: ["error", state.cloud.message || "Synchronizace se nezdařila"]
  };
  const [className, text] = values[state.cloud.status] || values.local;
  return `<button class="sync-banner ${className}" onclick="showAccount()"><span></span>${escapeHtml(text)}</button>`;
}

function render() {
  qs("#app").innerHTML = `<main class="shell">${state.tab === "plan" ? renderPlan() : state.tab === "map" ? renderMap() : state.tab === "database" ? renderDatabase() : renderTrips()}</main>`;
  if (state.deferred) { const button = qs("#installBtn"); if (button) button.style.display = "block"; }
}

window.setDay = index => { state.day = index; state.query = ""; render(); };
window.setTab = tab => { state.tab = tab; render(); };
window.searchStops = value => { state.query = value; render(); };
window.toggleDone = stopId => {
  if (!canEdit()) return;
  const key = stopStateKey(state.tripId, stopId);
  const existing = state.stopStates[key] || { done: false, reserved: false };
  state.stopStates[key] = { ...existing, done: !existing.done };
  state.dirtyStopStates.add(key);
  saveLocal(); render(); syncStopState(key);
};
window.toggleReserved = (dayIndex, stopIndex) => {
  if (!canEdit()) return;
  const stop = currentTrip().days[dayIndex].stops[stopIndex];
  const key = stopStateKey(state.tripId, stop.id);
  const existing = stopStatus(stop, dayIndex);
  state.stopStates[key] = { ...existing, reserved: !existing.reserved };
  state.dirtyStopStates.add(key);
  saveLocal(); render(); syncStopState(key);
};
window.openTrip = id => { state.tripId = id; state.day = 0; state.tab = "plan"; saveLocal(); render(); };

function modal(html) {
  qs("#modal")?.remove();
  document.body.insertAdjacentHTML("beforeend", `<div class="modal-wrap" id="modal" onclick="if(event.target===this)closeModal()"><div class="modal">${html}</div></div>`);
}
window.closeModal = () => qs("#modal")?.remove();

window.showAccount = () => {
  if (!cloud().configured) {
    modal(`<div class="spread"><h2>Cloud</h2><button class="btn secondary" onclick="closeModal()">Zavřít</button></div><p>Supabase není nakonfigurovaný. Aplikace dál funguje lokálně.</p>`);
    return;
  }
  if (!isSignedIn()) {
    const invite = new URLSearchParams(location.search).has("invite") ? '<div class="note">Po přihlášení automaticky přijmeme pozvánku.</div>' : "";
    modal(`<div class="spread"><h2>Přihlášení</h2><button class="btn secondary" onclick="closeModal()">Zavřít</button></div>${invite}<p class="address">Pošleme vám jednorázový přihlašovací odkaz. Heslo nepotřebujete.</p><form onsubmit="sendMagicLink(event)"><label class="field"><span>E-mail</span><input type="email" name="email" required autocomplete="email"></label><button class="btn rust">Poslat odkaz</button></form>`);
    return;
  }
  modal(`<div class="spread"><h2>Cloudový účet</h2><button class="btn secondary" onclick="closeModal()">Zavřít</button></div><p><b>${escapeHtml(state.cloud.session.user.email)}</b></p><p class="address">${escapeHtml(state.cloud.message || "Data jsou uložená i lokálně a synchronizují se se Supabase.")}</p><div class="small-actions"><button class="btn" onclick="flushPending()">Synchronizovat teď</button><button class="btn secondary" onclick="signOut()">Odhlásit</button></div>`);
};

window.sendMagicLink = async event => {
  event.preventDefault();
  const button = event.submitter;
  button.disabled = true; button.textContent = "Odesílám…";
  try {
    await cloud().signIn(new FormData(event.target).get("email"));
    event.target.innerHTML = '<div class="note">Odkaz je na cestě. Otevřete e-mail na tomto zařízení a klikněte na něj.</div>';
  } catch (error) {
    toast(errorText(error), "error"); button.disabled = false; button.textContent = "Poslat odkaz";
  }
};

window.signOut = async () => {
  try {
    await flushPending();
    if ((state.pendingCreates.size || state.dirtyTrips.size || state.dirtyStopStates.size) && !confirm("Některé změny se nepodařilo odeslat. Opravdu se odhlásit a odstranit jejich lokální kopii?")) return;
    await cloud().signOut();
    state.trips = normalizeTrips(DEFAULT_TRIPS);
    state.tripId = state.trips[0]?.id || "";
    state.stopStates = {}; state.done = {};
    state.dirtyTrips.clear(); state.dirtyStopStates.clear(); state.pendingCreates.clear();
    state.syncedUser = "";
    localStorage.removeItem("tripflow.syncedUser");
    state.cloud.session = null; state.cloud.status = "local";
    saveLocal(); closeModal(); render();
  } catch (error) { toast(errorText(error), "error"); }
};

window.newTrip = () => modal(`<div class="spread"><h2>Nová cesta</h2><button class="btn secondary" onclick="closeModal()">Zavřít</button></div><form onsubmit="createTrip(event)" class="grid"><label class="field"><span>Destinace</span><input name="city" required placeholder="Např. Lisabon"></label><label class="field"><span>Země</span><input name="country" required></label><label class="field"><span>Termín</span><input name="dates" required placeholder="10.–14. 5. 2027"></label><label class="field"><span>Cestující</span><input name="travelers" value="2 dospělí"></label><label class="field full"><span>Ubytování</span><input name="stay"></label><button class="btn rust full">Vytvořit cestu</button></form>`);

window.createTrip = async event => {
  event.preventDefault();
  const form = new FormData(event.target);
  const trip = { id: isSignedIn() ? crypto.randomUUID() : makeId("trip"), city: form.get("city"), country: form.get("country"), dates: form.get("dates"), travelers: form.get("travelers"), stay: form.get("stay"), budget: [], days: [{ date: "Den 1", title: "První den", distance: "-", walk: "-", total: "-", photo: "", stops: [] }] };
  state.trips.push(trip); state.tripId = trip.id; state.day = 0; state.tab = "plan";
  if (isSignedIn()) state.pendingCreates.add(trip.id);
  saveLocal(); closeModal(); render();
  if (isSignedIn()) await syncPendingCreate(trip.id);
};

window.editStop = index => {
  if (!canEdit()) return;
  const stop = currentDay().stops[index];
  modal(`<div class="spread"><h2>Upravit zastávku</h2><button class="btn secondary" onclick="closeModal()">Zavřít</button></div><form onsubmit="saveStop(event,${index})"><div class="grid"><label class="field"><span>Čas</span><input name="time" value="${escapeHtml(stop.time)}"></label><label class="field"><span>Typ</span><select name="type">${["sight","ticket","food","transport","hotel","other"].map(value => `<option ${stop.type === value ? "selected" : ""}>${value}</option>`).join("")}</select></label></div><label class="field"><span>Název</span><input name="name" required value="${escapeHtml(stop.name)}"></label><label class="field"><span>Adresa</span><input name="address" value="${escapeHtml(stop.address)}"></label><label class="field"><span>Cena</span><input name="price" value="${escapeHtml(stop.price || "")}"></label><label class="field"><span>Odkaz na rezervaci</span><input type="url" name="booking" value="${escapeHtml(stop.booking || "")}"></label><label class="field"><span>Poznámka</span><textarea name="note">${escapeHtml(stop.note || "")}</textarea></label><label class="checkbox-field"><input type="checkbox" name="reservationRequired" ${stop.reservationRequired ? "checked" : ""}> Povinná rezervace</label><div class="small-actions"><button class="btn rust">Uložit</button><button type="button" class="btn secondary" onclick="showDocuments('${stop.id}')">Dokumenty</button><button type="button" class="btn danger" onclick="deleteStop(${index})">Odstranit</button></div></form>`);
};

window.saveStop = (event, index) => {
  event.preventDefault();
  const form = new FormData(event.target);
  const old = currentDay().stops[index];
  currentDay().stops[index] = { ...old, ...Object.fromEntries(form), reservationRequired: form.has("reservationRequired") };
  markTripChanged(); closeModal(); render();
};
window.deleteStop = index => { if (confirm("Opravdu odstranit tuto zastávku?")) { currentDay().stops.splice(index, 1); markTripChanged(); closeModal(); render(); } };

window.editBudget = () => {
  if (!canEdit()) return;
  const rows = (currentTrip().budget || []).map((item, index) => `<div class="grid budget-row"><label class="field"><span>Kategorie</span><input name="cat-${index}" value="${escapeHtml(item.category)}"></label><label class="field"><span>Částka</span><input type="number" step="0.01" name="amt-${index}" value="${Number(item.amount || 0)}"></label><label class="field"><span>Měna</span><input name="cur-${index}" value="${escapeHtml(item.currency)}"></label><label class="field"><span>Stav</span><select name="paid-${index}"><option value="false">Nezaplaceno</option><option value="true" ${item.paid ? "selected" : ""}>Zaplaceno</option></select></label></div>`).join("");
  modal(`<div class="spread"><h2>Rozpočet</h2><button class="btn secondary" onclick="closeModal()">Zavřít</button></div><form onsubmit="saveBudget(event)">${rows || '<p class="address">Přidá se první položka.</p><input type="hidden" name="empty" value="1">'}<button class="btn rust">Uložit</button></form>`);
};
window.saveBudget = event => {
  event.preventDefault(); const form = new FormData(event.target); const old = currentTrip().budget || [];
  currentTrip().budget = old.length ? old.map((item, index) => ({ category: form.get(`cat-${index}`), amount: Number(form.get(`amt-${index}`) || 0), currency: form.get(`cur-${index}`), paid: form.get(`paid-${index}`) === "true" })) : [{ category: "Nová položka", amount: 0, currency: "CZK", paid: false }];
  markTripChanged(); closeModal(); render();
};

window.showTools = () => {
  const editable = canEdit();
  modal(`<div class="spread"><h2>Nástroje</h2><button class="btn secondary" onclick="closeModal()">Zavřít</button></div><div class="small-actions">${editable ? '<button class="btn" onclick="addDay()">＋ Den</button><button class="btn" onclick="addStop()">＋ Zastávka</button>' : ""}${isSignedIn() ? '<button class="btn secondary" onclick="showDocuments()">Dokumenty</button>' : ""}${isOwner() ? '<button class="btn secondary" onclick="showSharing()">Sdílení</button>' : ""}<button class="btn secondary" onclick="exportTrips()">Export JSON</button><button class="btn secondary" onclick="document.querySelector(\'#importFile\').click();closeModal()">Import JSON</button>${isOwner() ? '<button class="btn danger" onclick="deleteCurrentTrip()">Smazat cestu</button>' : ""}</div><p class="address tools-note">${editable ? "Změny se uloží lokálně a cloud je odešle po připojení." : "K této cestě máte přístup pouze pro čtení."}</p>`);
};
window.addDay = () => { currentTrip().days.push({ date: `Den ${currentTrip().days.length + 1}`, title: "Nový den", distance: "-", walk: "-", total: "-", photo: "", stops: [] }); state.day = currentTrip().days.length - 1; markTripChanged(); closeModal(); render(); };
window.addStop = () => { currentDay().stops.push({ id: makeId("stop"), time: "", name: "Nová zastávka", address: "", type: "sight", price: "", booking: "", note: "" }); const index = currentDay().stops.length - 1; markTripChanged(); closeModal(); editStop(index); };

window.deleteCurrentTrip = async () => {
  const trip = currentTrip();
  if (!trip || !confirm(`Opravdu trvale smazat cestu ${trip.city}?`)) return;
  try {
    if (isSignedIn() && !state.pendingCreates.has(trip.id)) await cloud().deleteTrip(trip.id);
    state.pendingCreates.delete(trip.id); state.dirtyTrips.delete(trip.id);
    state.trips = state.trips.filter(item => item.id !== trip.id); state.tripId = state.trips[0]?.id || ""; state.day = 0; state.tab = "trips";
    saveLocal(); closeModal(); render();
  } catch (error) { toast(errorText(error), "error"); }
};

window.exportTrips = () => {
  const blob = new Blob([JSON.stringify(state.trips, null, 2)], { type: "application/json" });
  const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "tripflow-itinerare.json"; link.click(); URL.revokeObjectURL(link.href);
};

window.showSharing = async () => {
  if (!isOwner()) return;
  modal('<div class="spread"><h2>Sdílení cesty</h2><button class="btn secondary" onclick="closeModal()">Zavřít</button></div><div class="loading">Načítám členy…</div>');
  try {
    const members = await cloud().getMembers(state.tripId);
    qs("#modal .loading").outerHTML = `<div class="member-list">${members.map(member => `<div class="member-row"><div><b>${escapeHtml(member.email || "Uživatel")}</b><div class="address">${escapeHtml(member.role)}</div></div>${member.role !== "owner" ? `<div class="small-actions"><button class="btn secondary compact" onclick="changeMemberRole('${member.user_id}','${member.role === "viewer" ? "editor" : "viewer"}')">${member.role === "viewer" ? "Povolit úpravy" : "Jen čtení"}</button><button class="btn danger compact" onclick="removeMember('${member.user_id}')">Odebrat</button></div>` : ""}</div>`).join("")}</div><hr><form onsubmit="createInvite(event)"><label class="field"><span>E-mail (volitelný)</span><input type="email" name="email" placeholder="Ponechte prázdné pro univerzální odkaz"></label><label class="field"><span>Oprávnění</span><select name="role"><option value="editor">Může upravovat</option><option value="viewer">Pouze číst</option></select></label><button class="btn rust">Vytvořit pozvánku</button></form><div id="inviteResult"></div>`;
  } catch (error) { toast(errorText(error), "error"); closeModal(); }
};
window.createInvite = async event => {
  event.preventDefault(); const form = new FormData(event.target); const button = event.submitter; button.disabled = true;
  try {
    const url = await cloud().createInvitation(state.tripId, form.get("email"), form.get("role"));
    qs("#inviteResult").innerHTML = `<label class="field invite-result"><span>Pozvánkový odkaz (platí 14 dní)</span><input id="inviteUrl" readonly value="${escapeHtml(url)}"></label><button type="button" class="btn secondary" onclick="copyInvite()">Kopírovat odkaz</button>`;
  } catch (error) { toast(errorText(error), "error"); }
  finally { button.disabled = false; }
};
window.copyInvite = async () => { const input = qs("#inviteUrl"); input.select(); await navigator.clipboard?.writeText(input.value); toast("Odkaz zkopírován.", "success"); };
window.changeMemberRole = async (userId, role) => { try { await cloud().updateMember(state.tripId, userId, role); showSharing(); } catch (error) { toast(errorText(error), "error"); } };
window.removeMember = async userId => { if (confirm("Odebrat tohoto účastníka?")) try { await cloud().removeMember(state.tripId, userId); showSharing(); } catch (error) { toast(errorText(error), "error"); } };

window.showDocuments = async (stopId = "") => {
  if (!isSignedIn()) { showAccount(); return; }
  modal('<div class="spread"><h2>Dokumenty</h2><button class="btn secondary" onclick="closeModal()">Zavřít</button></div><div class="loading">Načítám…</div>');
  try {
    state.documents = await cloud().listDocuments(state.tripId);
    const visible = stopId ? state.documents.filter(item => item.stop_id === stopId) : state.documents;
    const upload = canEdit() ? `<form class="document-upload" onsubmit="uploadDocument(event,'${stopId}')"><label class="field"><span>PDF, obrázek nebo jiný soubor</span><input type="file" name="file" required></label><button class="btn rust">Nahrát</button></form>` : "";
    qs("#modal .loading").outerHTML = `${upload}<div class="document-list">${visible.map(document => `<div class="member-row"><button class="document-name" onclick="openDocument('${document.id}')">📎 ${escapeHtml(document.name)}</button>${canEdit() ? `<button class="btn danger compact" onclick="deleteDocument('${document.id}','${stopId}')">Smazat</button>` : ""}</div>`).join("") || '<div class="empty">Žádné dokumenty.</div>'}</div>`;
  } catch (error) { toast(errorText(error), "error"); closeModal(); }
};
window.uploadDocument = async (event, stopId) => { event.preventDefault(); const file = new FormData(event.target).get("file"); const button = event.submitter; button.disabled = true; button.textContent = "Nahrávám…"; try { await cloud().uploadDocument(state.tripId, file, stopId || null); showDocuments(stopId); } catch (error) { toast(errorText(error), "error"); button.disabled = false; button.textContent = "Nahrát"; } };
window.openDocument = async id => {
  const document = state.documents.find(item => item.id === id);
  if (!document) return;
  const popup = window.open("about:blank", "_blank");
  if (popup) popup.opener = null;
  try {
    const url = await cloud().getDocumentUrl(document.storage_path);
    if (popup) popup.location.href = url; else window.location.href = url;
  } catch (error) {
    popup?.close(); toast(errorText(error), "error");
  }
};
window.deleteDocument = async (id, stopId) => { const document = state.documents.find(item => item.id === id); if (document && confirm("Smazat tento dokument?")) try { await cloud().deleteDocument(document); showDocuments(stopId); } catch (error) { toast(errorText(error), "error"); } };

qs("#importFile").addEventListener("change", async event => {
  try {
    const parsed = JSON.parse(await event.target.files[0].text());
    const incoming = normalizeTrips(Array.isArray(parsed) ? parsed : [parsed]);
    if (!incoming.length || !incoming.every(item => item.city && Array.isArray(item.days))) throw new Error("Neplatný formát TripFlow.");
    if (isSignedIn()) {
      const imported = await cloud().importTrips(incoming); state.trips.push(...imported); state.tripId = imported[0].id;
    } else {
      incoming.forEach(item => { const index = state.trips.findIndex(existing => existing.id === item.id); if (index >= 0) state.trips[index] = item; else state.trips.push(item); }); state.tripId = incoming[0].id;
    }
    state.day = 0; saveLocal(); render(); toast("Itinerář byl importován.", "success");
  } catch (error) { toast(errorText(error), "error"); }
  event.target.value = "";
});

async function acceptInviteIfPresent() {
  const params = new URLSearchParams(location.search); const token = params.get("invite");
  if (!token || !isSignedIn()) return false;
  await cloud().acceptInvitation(token); params.delete("invite");
  history.replaceState({}, "", `${location.pathname}${params.toString() ? `?${params}` : ""}`);
  toast("Pozvánka byla přijata.", "success"); return true;
}

async function loadCloudData() {
  if (!isSignedIn()) return;
  if (state.cloud.loadPromise) return state.cloud.loadPromise;
  state.cloud.loadPromise = (async () => {
    state.cloud.status = "syncing"; render();
    try {
      await acceptInviteIfPresent();
      const localTrips = state.trips;
      const localById = new Map(localTrips.map(trip => [trip.id, trip]));
      const localStopStates = state.stopStates;
      let loaded = await cloud().loadTrips();
      const firstCloudLogin = state.syncedUser !== state.cloud.session.user.id;
      let migratedLocal = false;
      if (!loaded.trips.length && localTrips.length && firstCloudLogin) {
        localStorage.setItem("tripflow.preCloudBackup", JSON.stringify({ trips: localTrips, stopStates: localStopStates }));
        const imported = await cloud().importTrips(localTrips);
        const migratedStates = {};
        localTrips.forEach((oldTrip, tripIndex) => {
          const newTrip = imported[tripIndex];
          (oldTrip.days || []).forEach((day, dayIndex) => (day.stops || []).forEach(stop => {
            const oldShared = localStopStates[stopStateKey(oldTrip.id, stop.id)] || {};
            const legacyDone = Boolean(state.done[`${oldTrip.id}-${dayIndex}-${stop.name}`]);
            const value = { done: oldShared.done ?? legacyDone, reserved: oldShared.reserved ?? Boolean(stop.reserved) };
            if (value.done || value.reserved) {
              const newKey = stopStateKey(newTrip.id, stop.id);
              migratedStates[newKey] = value;
              state.dirtyStopStates.add(newKey);
            }
          }));
        });
        state.stopStates = migratedStates;
        state.dirtyTrips.clear(); state.pendingCreates.clear();
        migratedLocal = true;
        loaded = await cloud().loadTrips();
        toast("Lokální cesty byly přesunuty do cloudu.", "success");
      }
      if (firstCloudLogin && loaded.trips.length && !migratedLocal) {
        if (!localStorage.getItem("tripflow.preCloudBackup")) localStorage.setItem("tripflow.preCloudBackup", JSON.stringify({ trips: localTrips, stopStates: localStopStates }));
        state.trips = normalizeTrips(loaded.trips);
        state.stopStates = loaded.stopStates;
        state.dirtyTrips.clear(); state.pendingCreates.clear(); state.dirtyStopStates.clear();
      } else {
        state.trips = normalizeTrips(loaded.trips).map(trip => state.dirtyTrips.has(trip.id) ? (localById.get(trip.id) || trip) : trip);
        for (const pendingId of state.pendingCreates) {
          const pending = localById.get(pendingId);
          if (pending && !state.trips.some(trip => trip.id === pendingId)) state.trips.push(pending);
        }
        const pendingLocalStates = migratedLocal ? state.stopStates : localStopStates;
        const mergedStates = { ...loaded.stopStates };
        for (const key of state.dirtyStopStates) if (pendingLocalStates[key]) mergedStates[key] = pendingLocalStates[key];
        state.stopStates = mergedStates;
      }
      state.syncedUser = state.cloud.session.user.id;
      if (!state.trips.some(item => item.id === state.tripId)) state.tripId = state.trips[0]?.id || "";
      state.cloud.status = navigator.onLine ? "synced" : "offline"; state.cloud.message = "";
      saveLocal(); cloud().startRealtime(); render(); await flushPending();
    } catch (error) {
      state.cloud.status = navigator.onLine ? "error" : "offline"; state.cloud.message = errorText(error); render();
    } finally { state.cloud.loadPromise = null; }
  })();
  return state.cloud.loadPromise;
}

function handleCloudEvent(event) {
  if (event.type === "ready" || event.type === "auth") {
    state.cloud.session = event.session || null;
    if (state.cloud.session) loadCloudData();
    else { state.cloud.status = cloud().configured ? "local" : "unconfigured"; render(); }
    return;
  }
  if (event.type === "realtime" && event.status === "SUBSCRIBED") { state.cloud.status = "synced"; render(); return; }
  if (event.type === "trip-change") {
    const row = event.payload.new; const oldId = event.payload.old?.id;
    if (event.payload.eventType === "DELETE") { state.trips = state.trips.filter(item => item.id !== oldId); saveLocal(); render(); return; }
    if (!row?.id || state.dirtyTrips.has(row.id)) return;
    const trip = normalizeTrips([{ ...(row.data || {}), id: row.id }])[0]; const index = state.trips.findIndex(item => item.id === row.id);
    if (index >= 0) state.trips[index] = trip; else state.trips.push(trip); saveLocal(); render(); return;
  }
  if (event.type === "stop-state-change") {
    const row = event.payload.new; if (!row?.trip_id || !row?.stop_id) return;
    const key = stopStateKey(row.trip_id, row.stop_id); if (state.dirtyStopStates.has(key)) return;
    state.stopStates[key] = { done: row.done, reserved: row.reserved }; saveLocal(); render();
  }
  if (event.type === "error") { state.cloud.status = "error"; state.cloud.message = errorText(event.error); render(); }
}

window.addEventListener("beforeinstallprompt", event => { event.preventDefault(); state.deferred = event; render(); });
window.installPWA = async () => { if (!state.deferred) return; state.deferred.prompt(); await state.deferred.userChoice; state.deferred = null; render(); };
window.addEventListener("online", () => { state.cloud.status = isSignedIn() ? "syncing" : state.cloud.status; render(); flushPending(); });
window.addEventListener("offline", () => { if (isSignedIn()) { state.cloud.status = "offline"; render(); } });
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
saveLocal();
render();
cloud().init(handleCloudEvent).catch(error => handleCloudEvent({ type: "error", error }));
if (new URLSearchParams(location.search).has("invite") && !isSignedIn()) window.setTimeout(showAccount, 100);
