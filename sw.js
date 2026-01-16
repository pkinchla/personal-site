var version = "v10.91";

var theme_path = "wp-content/themes/special/";

var offlineFundamentals = [
  theme_path + "dist/js/main.js",
  theme_path + "dist/js/prism.js",
  theme_path + "offline.html",
  "/typefaces/arbeit-variable.woff2",
  "/typefaces/cooper-wght.woff2",
  "/typefaces/cooper-italic-wght.woff2",
  "manifest.json",
  "icon_192.png",
];

//Add core website files to cache during serviceworker installation
var updateStaticCache = function () {
  return caches.open(version + "fundamentals").then(function (cache) {
    return Promise.all(
      offlineFundamentals.map(function (value) {
        var request = new Request(value);
        var url = new URL(request.url);
        if (url.origin != location.origin) {
          request = new Request(value, { mode: "no-cors" });
        }
        return fetch(request).then(function (response) {
          var cachedCopy = response.clone();
          return cache.put(request, cachedCopy);
        });
      }),
    );
  });
};

//Clear caches with a different version number
var clearOldCaches = function () {
  return caches.keys().then(function (keys) {
    return Promise.all(
      keys
        .filter(function (key) {
          return key.indexOf(version) != 0;
        })
        .map(function (key) {
          return caches.delete(key);
        }),
    );
  });
};

/*
  limits the cache
  If cache has more than maxItems then it removes the first item in the cache
*/
var limitCache = function (cache, maxItems) {
  cache.keys().then(function (items) {
    if (items.length > maxItems) {
      cache.delete(items[0]);
    }
  });
};

/*
  trims the cache
  If cache has more than maxItems then it removes the excess items starting from the beginning
*/
var trimCache = function (cacheName, maxItems) {
  caches.open(cacheName).then(function (cache) {
    cache.keys().then(function (keys) {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
};

//When the service worker is first added to a computer
self.addEventListener("install", function (event) {
  event.waitUntil(
    updateStaticCache().then(function () {
      return self.skipWaiting();
    }),
  );
});

self.addEventListener("message", function (event) {
  var data = event.data;

  //Send this command whenever many files are downloaded (ex: a page load)
  if (data.command == "trimCache") {
    trimCache(version + "pages", 25);
    trimCache(version + "images", 10);
    trimCache(version + "assets", 30);
  }
});

//Service worker handles networking
self.addEventListener("fetch", function (event) {
  var url = new URL(event.request.url);
  var destination = event.request.destination;

  //Fetch from network and cache
  var fetchFromNetwork = function (response) {
    var cacheCopy = response.clone();

    switch (destination) {
      case "document": {
        if (response.type === "basic") {
          caches.open(version + "pages").then(function (cache) {
            cache.put(event.request, cacheCopy).then(function () {
              limitCache(cache, 25);
            });
          });
        }
        return response;
      }
      case "image": {
        caches.open(version + "images").then(function (cache) {
          cache.put(event.request, cacheCopy).then(function () {
            limitCache(cache, 10);
          });
        });
        return response;
      }
      case "script":
      case "": {
        return response;
      }
      default: {
        caches.open(version + "assets").then(function add(cache) {
          cache.put(event.request, cacheCopy);
        });
        return response;
      }
    }
  };

  //Fetch from network failed
  var fallback = function () {
    if (destination === "document") {
      return caches.match(event.request).then(function (response) {
        return response || caches.match(theme_path + "offline.html");
      });
    }
  };

  //Only deal with requests to my own server
  if (url.origin !== location.origin) {
    return;
  }

  var re =
    /\b(?:wp-login|wp-admin|wp-includes|preview=true|wp-content\/plugins)\b/gi;

  var noCache = re.test(event.request.url);

  //This service worker won't touch the admin area and preview pages
  if (noCache) {
    return;
  }

  //This service worker won't touch non-get requests
  if (event.request.method !== "GET") {
    return;
  }

  //For HTML requests, look for file in network, then cache if network fails.
  if (destination === "document") {
    event.respondWith(fetch(event.request).then(fetchFromNetwork, fallback));
    return;
  }

  //For non-HTML requests, look for file in cache, then network if no cache exists.
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request).then(fetchFromNetwork, fallback);
    }),
  );
});

//After the install event
self.addEventListener("activate", function (event) {
  event.waitUntil(
    clearOldCaches().then(function () {
      return self.clients.claim();
    }),
  );
});
