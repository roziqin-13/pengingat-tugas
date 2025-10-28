const CACHE_NAME = "pengingat-tugas-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json"
];

// install service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// aktifkan cache saat offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
