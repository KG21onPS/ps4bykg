
const PAYLOAD_URL = "payloads/goldhen.bin";
const CACHE_NAME = "ps4bykg-v1";

const $ = (id) => document.getElementById(id);

function log(msg) {
  const now = new Date().toLocaleTimeString();
  $("log").textContent += `[${now}] ${msg}\n`;
  $("log").scrollTop = $("log").scrollHeight;
}

function setStatus(msg) {
  $("status").textContent = msg;
  log(msg);
}

function detectFirmware() {
  const ua = navigator.userAgent || "";
  $("browser").textContent = ua || "Inconnu";

  const patterns = [
    /PlayStation 4\/([0-9.]+)/i,
    /PS4\/([0-9.]+)/i,
    /Firmware[\/\s]([0-9.]+)/i
  ];

  for (const p of patterns) {
    const m = ua.match(p);
    if (m) return m[1];
  }

  return "Non détecté";
}

async function loadPayload() {
  $("loadBtn").disabled = true;
  setStatus("Téléchargement du payload...");

  try {
    const response = await fetch(PAYLOAD_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    window.PS4BYKG_PAYLOAD = buffer;

    setStatus(`Payload chargé : ${buffer.byteLength} octets`);
    log("Le payload est disponible dans window.PS4BYKG_PAYLOAD.");
    log("Aucune exécution n'est effectuée par ce host statique.");
  } catch (error) {
    setStatus(`Erreur : ${error.message}`);
  } finally {
    $("loadBtn").disabled = false;
  }
}

async function cacheOffline() {
  if (!("caches" in window)) {
    setStatus("Cache API indisponible sur ce navigateur.");
    return;
  }

  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
      "./",
      "index.html",
      "style.css",
      "js/host.js",
      "manifest.webmanifest",
      PAYLOAD_URL
    ]);
    setStatus("Host et payload mis en cache.");
  } catch (error) {
    setStatus(`Erreur cache : ${error.message}`);
  }
}

async function clearOffline() {
  if (!("caches" in window)) {
    setStatus("Cache API indisponible.");
    return;
  }

  await caches.delete(CACHE_NAME);
  setStatus("Cache supprimé.");
}

document.addEventListener("DOMContentLoaded", () => {
  $("firmware").textContent = detectFirmware();
  $("payloadName").textContent = PAYLOAD_URL;

  $("loadBtn").addEventListener("click", loadPayload);
  $("cacheBtn").addEventListener("click", cacheOffline);
  $("clearBtn").addEventListener("click", clearOffline);

  log("PS4 by KG chargé.");
});
