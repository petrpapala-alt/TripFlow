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

const state = {
  trips: JSON.parse(localStorage.getItem("tripflow.trips") || "null") || DEFAULT_TRIPS,
  tripId: localStorage.getItem("tripflow.tripId") || "rome-2026",
  day: 0,
  tab: "plan",
  query: "",
  done: JSON.parse(localStorage.getItem("tripflow.done") || "{}"),
  deferred: null
};

const qs = selector => document.querySelector(selector);
const save = () => {
  localStorage.setItem("tripflow.trips", JSON.stringify(state.trips));
  localStorage.setItem("tripflow.tripId", state.tripId);
  localStorage.setItem("tripflow.done", JSON.stringify(state.done));
};
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));
const currentTrip = () => state.trips.find(t => t.id === state.tripId) || state.trips[0];
const currentDay = () => currentTrip().days[state.day] || currentTrip().days[0];

function routeUrl(day = currentDay()) {
  const stops = day.stops.filter(item => item.address);
  if (stops.length < 2) return "#";
  const origin = encodeURIComponent(stops[0].address);
  const destination = encodeURIComponent(stops.at(-1).address);
  const waypoints = stops.slice(1, -1).map(item => encodeURIComponent(item.address)).join("%7C");
  return `https://www.google.com/maps/dir/?api=1&travelmode=walking&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
}

function header() {
  const trip = currentTrip();
  return `
    <header class="hero">
      <div class="spread">
        <div>
          <div class="brand">TripFlow</div>
          <h1>${escapeHtml(trip.city)}</h1>
          <div class="sub">${escapeHtml(trip.dates)} · ${escapeHtml(trip.travelers)}</div>
        </div>
        <button class="btn secondary icon" onclick="showTools()">⋯</button>
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
  const key = `${state.tripId}-${state.day}-${stop.name}`;
  const isDone = Boolean(state.done[key]);
  const booking = stop.booking
    ? `<a class="link" href="${escapeHtml(stop.booking)}" target="_blank" rel="noopener">Rezervace ↗</a>` : "";
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.address)}`;
  return `<article class="stop ${isDone ? "done" : ""}">
    <button class="check" onclick="toggleDone('${encodeURIComponent(key)}')">${isDone ? "✓" : ""}</button>
    <div>
      <div class="spread"><div><div class="time">${escapeHtml(stop.time)}</div><h3>${escapeHtml(stop.name)}</h3></div>
      <button class="btn secondary icon" onclick="editStop(${index})">✎</button></div>
      <div class="address">📍 ${escapeHtml(stop.address)}</div>
      <div class="tags"><span class="tag">💳 ${escapeHtml(stop.price || "neuvedeno")}</span>${booking}
      <a class="link" href="${map}" target="_blank" rel="noopener">Navigovat ↗</a></div>
      ${stop.note ? `<div class="note">${escapeHtml(stop.note)}</div>` : ""}
    </div>
  </article>`;
}

function renderPlan() {
  const trip = currentTrip();
  const day = currentDay();
  const stops = day.stops.filter(item => `${item.name} ${item.address}`.toLowerCase().includes(state.query.toLowerCase()));
  return `${header()}<section class="pad">
    <button id="installBtn" class="btn install" onclick="installPWA()">Přidat TripFlow na plochu</button>
    <div class="days">${trip.days.map((item, index) => `<button class="day-btn ${index === state.day ? "active" : ""}" onclick="setDay(${index})"><small>${escapeHtml(item.date)}</small><b>Den ${index + 1}</b></button>`).join("")}</div>
    <div class="cover"><img src="${escapeHtml(day.photo || "")}" alt="${escapeHtml(day.title)}" onerror="this.style.display='none'">
      <div class="cover-title"><small>${escapeHtml(day.date)}</small><h2>${escapeHtml(day.title)}</h2></div></div>
    <div class="metrics"><div class="metric"><b>${escapeHtml(day.distance)}</b><small>trasa</small></div>
      <div class="metric"><b>${escapeHtml(day.walk)}</b><small>čistá chůze</small></div>
      <div class="metric"><b>${escapeHtml(day.total)}</b><small>celkem</small></div></div>
    <div class="toolbar"><input class="search" value="${escapeHtml(state.query)}" oninput="searchStops(this.value)" placeholder="Najít zastávku">
      <a class="btn icon" href="${routeUrl()}" target="_blank" rel="noopener">➤</a></div>
    ${stops.map((item, index) => stopCard(item, index)).join("")}
    <div class="offline">Data a změny jsou uložené v tomto zařízení. Základ aplikace funguje offline.</div>
  </section>${navigation()}`;
}

function renderMap() {
  const day = currentDay();
  return `${header()}<section class="panel"><h2 class="section-title">${escapeHtml(day.title)}</h2>
    <div class="metrics"><div class="metric"><b>${escapeHtml(day.distance)}</b><small>trasa</small></div>
    <div class="metric"><b>${escapeHtml(day.walk)}</b><small>chůze</small></div><div class="metric"><b>${day.stops.length}</b><small>zastávek</small></div></div>
    <div class="route-list">${day.stops.map(item => `<div class="route-item"><b>${escapeHtml(item.time)} · ${escapeHtml(item.name)}</b><small>${escapeHtml(item.address)}</small></div>`).join("")}</div>
    <a class="btn rust" style="display:block;text-align:center;text-decoration:none" target="_blank" rel="noopener" href="${routeUrl()}">Otevřít celou trasu v Google Maps</a>
  </section>${navigation()}`;
}

function renderDatabase() {
  const trip = currentTrip();
  const all = trip.days.flatMap((day, dayIndex) => day.stops.map((stop, stopIndex) => ({ ...stop, dayIndex, stopIndex, day: day.date })));
  const required = all.filter(item => item.reservationRequired);
  const reserved = required.filter(item => item.reserved).length;
  const budget = trip.budget || [];
  return `${header()}<section class="panel"><h2 class="section-title">Cestovní databáze</h2>
    <div class="metrics"><div class="metric"><b>${trip.days.length}</b><small>dnů</small></div>
    <div class="metric"><b>${all.length}</b><small>zastávek</small></div><div class="metric"><b>${reserved}/${required.length}</b><small>rezervací</small></div></div>
    <h3>Rezervace</h3>${required.map(item => `<article class="stop ${item.reserved ? "done" : ""}"><button class="check" onclick="toggleReserved(${item.dayIndex},${item.stopIndex})">${item.reserved ? "✓" : ""}</button><div><div class="time">${escapeHtml(item.day)} · ${escapeHtml(item.time)}</div><h3>${escapeHtml(item.name)}</h3><div class="address">${item.reserved ? "Rezervováno" : "Čeká na rezervaci"}</div>${item.booking ? `<div class="tags"><a class="link" href="${escapeHtml(item.booking)}" target="_blank" rel="noopener">Otevřít rezervaci ↗</a></div>` : ""}</div></article>`).join("") || '<div class="empty">Žádné povinné rezervace.</div>'}
    <h3 style="margin-top:18px">Rozpočet</h3>${budget.map(item => `<div class="trip-card"><div class="trip-body spread"><div><b>${escapeHtml(item.category)}</b><div class="address">${item.paid ? "Zaplaceno" : "Nezaplaceno"}</div></div><strong>${Number(item.amount || 0).toLocaleString("cs-CZ")} ${escapeHtml(item.currency)}</strong></div></div>`).join("")}
  </section>${navigation()}`;
}

function renderTrips() {
  return `${header()}<section class="panel"><div class="spread"><h2 class="section-title">Moje cesty</h2><button class="btn rust" onclick="newTrip()">＋ Nová</button></div>
  ${state.trips.map(item => `<article class="trip-card"><div class="trip-banner"></div><div class="trip-body"><div class="spread"><div><h3>${escapeHtml(item.city)}, ${escapeHtml(item.country)}</h3><div class="address">${escapeHtml(item.dates)} · ${item.days.length} dny</div></div><button class="btn" onclick="openTrip('${item.id}')">Otevřít</button></div></div></article>`).join("")}</section>${navigation()}`;
}

function render() {
  qs("#app").innerHTML = `<main class="shell">${state.tab === "plan" ? renderPlan() : state.tab === "map" ? renderMap() : state.tab === "database" ? renderDatabase() : renderTrips()}</main>`;
  if (state.deferred) { const button = qs("#installBtn"); if (button) button.style.display = "block"; }
}

window.setDay = index => { state.day = index; state.query = ""; render(); };
window.setTab = tab => { state.tab = tab; render(); };
window.searchStops = value => { state.query = value; render(); };
window.toggleDone = encoded => { const key = decodeURIComponent(encoded); state.done[key] = !state.done[key]; save(); render(); };
window.toggleReserved = (dayIndex, stopIndex) => { const stop = currentTrip().days[dayIndex].stops[stopIndex]; stop.reserved = !stop.reserved; save(); render(); };
window.openTrip = id => { state.tripId = id; state.day = 0; state.tab = "plan"; save(); render(); };
window.showTools = () => alert("Nástroje budou znovu doplněny po stabilizaci aplikace.");
window.editStop = () => alert("Úpravy zastávek budou znovu doplněny po stabilizaci aplikace.");
window.newTrip = () => alert("Přidání cesty bude znovu doplněno po stabilizaci aplikace.");

window.addEventListener("beforeinstallprompt", event => { event.preventDefault(); state.deferred = event; render(); });
window.installPWA = async () => { if (!state.deferred) return; state.deferred.prompt(); await state.deferred.userChoice; state.deferred = null; render(); };
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
render();
