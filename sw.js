/* Offline cache. Bump CACHE when content changes. */
const CACHE = "fe7-fg-v33";
const ASSETS = [
  "./",
  "index.html",
  "app.css",
  "app.js",
  "data-fe7.js",
  "data-supports.js",
  "data-fe8.js",
  "data-fe8-supports.js",
  "data-fe9.js",
  "data-lore-fe7.js",
  "data-lore-fe8.js",
  "data-plans.js",
  "data-promo.js",
  "manifest.json",
  "icon.svg",
  "icon-180.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return Promise.all(
        ASSETS.map((url) =>
          fetch(url, { cache: "reload" })
            .then((res) => (res && res.ok ? cache.put(url, res) : null))
            .catch(() => null)
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  // Navigations: network first, so a deploy is picked up on the next open.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put("index.html", copy));
          }
          return res;
        })
        .catch(() => caches.match(event.request).then((hit) => hit || caches.match("index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((hit) => {
      if (hit) {
        fetch(event.request).then((res) => {
          if (res && res.ok) caches.open(CACHE).then((c) => c.put(event.request, res.clone()));
        }).catch(() => {});
        return hit;
      }
      return fetch(event.request).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(event.request, copy));
        }
        return res;
      }).catch(() => caches.match("index.html"));
    })
  );
});
