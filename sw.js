const VERSION = "v10.93";
const THEME_PATH = "wp-content/themes/special/";

const CACHE = {
  fundamentals: `${VERSION}fundamentals`,
  pages: `${VERSION}pages`,
  images: `${VERSION}images`,
  assets: `${VERSION}assets`,
};

const CACHE_MAX = {
  [CACHE.pages]: 25,
  [CACHE.images]: 10,
  [CACHE.assets]: 30,
};

const OFFLINE_FUNDAMENTALS = [
  `${THEME_PATH}dist/js/main.js`,
  `${THEME_PATH}dist/js/prism.js`,
  `${THEME_PATH}offline.html`,
  "/typefaces/arbeit-variable.woff2",
  "/typefaces/cooper-wght.woff2",
  "/typefaces/cooper-italic-wght.woff2",
  "manifest.json",
  "icon_192.png",
];

const WP_BYPASS_RE =
  /\b(?:wp-login|wp-admin|wp-includes|preview=true|wp-content\/plugins)\b/i;

async function updateStaticCache() {
  const cache = await caches.open(CACHE.fundamentals);
  // allSettled so a single missing file doesn't abort the whole install
  await Promise.allSettled(
    OFFLINE_FUNDAMENTALS.map(async (value) => {
      const probe = new Request(value);
      const isCrossOrigin = new URL(probe.url).origin !== location.origin;
      const request = isCrossOrigin
        ? new Request(value, { mode: "no-cors" })
        : probe;
      const response = await fetch(request);
      await cache.put(request, response);
    }),
  );
}

async function clearOldCaches() {
  const keys = await caches.keys();
  await Promise.all(
    keys
      .filter((key) => !key.startsWith(VERSION))
      .map((key) => caches.delete(key)),
  );
}

// Removes all entries over the limit in one pass, oldest first
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  const excess = keys.length - maxItems;
  for (let i = 0; i < excess; i++) {
    await cache.delete(keys[i]);
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(updateStaticCache().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clearOldCaches().then(() => self.clients.claim()));
});

self.addEventListener("message", (event) => {
  if (event.data?.command === "trimCache") {
    trimCache(CACHE.pages, CACHE_MAX[CACHE.pages]);
    trimCache(CACHE.images, CACHE_MAX[CACHE.images]);
    trimCache(CACHE.assets, CACHE_MAX[CACHE.assets]);
  }
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const { destination } = event.request;

  if (url.origin !== location.origin) return;
  if (WP_BYPASS_RE.test(event.request.url)) return;
  if (event.request.method !== "GET") return;

  // HTML: network-first, fall back to cached page then offline shell
  if (destination === "document") {
    event.respondWith(
      fetch(event.request)
        .then(async (response) => {
          if (response.type === "basic") {
            const cache = await caches.open(CACHE.pages);
            await cache.put(event.request, response.clone());
            trimCache(CACHE.pages, CACHE_MAX[CACHE.pages]);
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          return cached ?? caches.match(`${THEME_PATH}offline.html`);
        }),
    );
    return;
  }

  // Scripts and bare fetch() calls: pass through without caching
  if (destination === "script" || destination === "") return;

  // Images and other assets: cache-first, network fallback
  const cacheName = destination === "image" ? CACHE.images : CACHE.assets;
  event.respondWith(
    caches.match(event.request).then(async (cached) => {
      if (cached) return cached;
      const response = await fetch(event.request);
      const cache = await caches.open(cacheName);
      await cache.put(event.request, response.clone());
      trimCache(cacheName, CACHE_MAX[cacheName]);
      return response;
    }),
  );
});
