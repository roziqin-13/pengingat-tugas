const CACHE_NAME = "pengingat-v4";
const FILES_TO_CACHE = ["./", "./index.html", "./manifest.json", "./123.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});

// === NOTIFIKASI PERIODIK ===
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "pengingat-tugas") {
    showNotification();
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("./index.html")
  );
});

function showNotification() {
  self.registration.showNotification("Pengingat Tugas 🕐", {
    body: "Ojo Klalen Buka TugasMu Saiki!",
    icon: "123.png",
    badge: "123.png",
  });
}
