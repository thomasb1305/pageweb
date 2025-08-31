// ws-control.js (universel ws/wss + proxy + reconnexion)

let socket;
let reconnectAttempts = 0;
let reconnectTimer = null;
const MAX_BACKOFF = 10000; // ms
const HEARTBEAT_MS = 20000;
let heartbeatTimer = null;

// file d'envoi si la socket n'est pas encore ouverte
const outbox = [];

// --------- Helpers log ----------
const log = (msg) => {
  const logEl = document.getElementById("log");
  if (logEl) {
    logEl.textContent += msg + "\n";
    logEl.scrollTop = logEl.scrollHeight;
  }
  console.log(msg);
};

// --------- Résolution d'URL ----------
function getOverrideFromQuery() {
  try {
    const u = new URL(window.location.href);
    const ws = u.searchParams.get("ws"); // ex ?ws=wss://example.com/ws
    return ws || null;
  } catch (_) {
    return null;
  }
}

function getOverrideFromScriptTag() {
  // <script src="ws-control.js" data-ws="wss://ws.example.com/ws"></script>
  const currentScript = document.currentScript || [...document.getElementsByTagName("script")].pop();
  if (currentScript && currentScript.dataset && currentScript.dataset.ws) {
    return currentScript.dataset.ws;
  }
  return null;
}

function pickWSUrl() {
  // 1) Overrides (query, script data-attr, global)
  const fromQuery = getOverrideFromQuery();
  if (fromQuery) return fromQuery;

  const fromScript = getOverrideFromScriptTag();
  if (fromScript) return fromScript;

  if (window.WS_URL && typeof window.WS_URL === "string") {
    return window.WS_URL;
  }

  // 2) Même origine (recommandé en prod derrière proxy) :
  //    si la page est https -> wss://<host>/ws
  //    si la page est http  -> ws://<host>/ws
  const sameOrigin = (window.location.protocol === "https:" ? "wss://" : "ws://") + window.location.host + "/ws";

  // 3) Fallback local (ton Java direct)
  const localFallback = "ws://localhost:8080";

  // Heuristique : si on est en localhost, tente direct Java, sinon tente même origine
  const isLocalHost =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.hostname === "::1";

  return isLocalHost ? localFallback : sameOrigin;
}

// --------- Heartbeat ----------
function startHeartbeat() {
  stopHeartbeat();
  heartbeatTimer = setInterval(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      try { socket.send("__ping__"); } catch (_) {}
    }
  }, HEARTBEAT_MS);
}
function stopHeartbeat() {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
}

// --------- Connexion ----------
function connectWS() {
  const url = pickWSUrl();
  log(`🔌 Connexion à ${url} ...`);

  try {
    socket = new WebSocket(url);
  } catch (e) {
    log("❌ Échec immédiat d'instanciation WebSocket: " + e.message);
    scheduleReconnect();
    return;
  }

  socket.onopen = () => {
    log("✅ WebSocket connectée");
    reconnectAttempts = 0;
    startHeartbeat();

    // vider la file d'attente
    while (outbox.length) {
      const msg = outbox.shift();
      try {
        socket.send(msg);
        log("📤 Envoyé (flush): " + msg);
      } catch (e) {
        log("⚠️ Échec d'envoi (flush): " + e.message);
        outbox.unshift(msg);
        break;
      }
    }
  };

  socket.onmessage = (e) => {
    // ignore les heartbeats
    if (e.data === "__pong__" || e.data === "__ping__") return;
    log("📨 Reçu : " + e.data);
  };

  socket.onerror = (e) => {
    // e.message est souvent vide côté navigateur
    log("⚠️ Erreur WebSocket");
  };

  socket.onclose = (ev) => {
    stopHeartbeat();
    log(`❌ WebSocket fermée (code=${ev.code} reason="${ev.reason || ""}")`);
    scheduleReconnect();
  };
}

// --------- Reconnexion exponentielle ----------
function scheduleReconnect() {
  if (reconnectTimer) return;
  const delay = Math.min(MAX_BACKOFF, 500 * 2 ** reconnectAttempts);
  reconnectAttempts++;
  log(`⏳ Reconnexion dans ${Math.round(delay / 1000)}s ...`);
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connectWS();
  }, delay);
}

// --------- API publique ----------
function sendWS(msg) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(msg);
    log("📤 Envoyé : " + msg);
  } else {
    // si pas connecté, queue puis tentative de reco
    outbox.push(msg);
    log("🕒 Socket fermée, message mis en file : " + msg);
    if (!reconnectTimer) scheduleReconnect();
  }
}

// exposer pour les autres scripts/pages
window.sendWS = sendWS;

// 🚀 Connexion automatique
window.addEventListener("load", connectWS);

console.log("ws-control.js chargé !");
