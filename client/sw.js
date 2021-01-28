const CACHE = 'gallery-v3';

const ASSETS = [
  '/index.html',
  '/favicon.ico',
  '/styles/style.css',
  '/scripts/utils.js',
  '/scripts/notifications.js',
  '/scripts/app.js',
  '/scripts/image.js',
  '/assets/icons/icon48.png',
  '/assets/icons/icon72.png',
  '/assets/icons/icon96.png',
  '/assets/icons/icon144.png',
  '/assets/icons/icon168.png',
  '/assets/icons/icon192.png',
  '/assets/imgs/tiny/tinyImageDictionary.js',
];

self.addEventListener('install', event => {
  const cacheAssets = 
    caches
      .open(CACHE)
      .then(function (cache) {
        return cache.addAll(ASSETS);
      })
      .catch(_err => { });

  event.waitUntil(
    cacheAssets()
  );
});

self.addEventListener('fetch', event => {
  console.log('Request : [%s] %s', event.request.method, event.request.url);

  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (response) {
          console.log('Response from cache :', response);
          return response;
        } else {
          console.log('Response not found in cache');
          return fetch(event.request)
            .then(function (res) {
              console.log('Response from web :', res);
              return caches
                .open(CACHE)
                .then(function (cache) {
                  console.log('Response putted in the cache');
                  cache.put(event.request.url, res.clone());
                  return res;
                })
                .catch(console.error);
            })
            .catch(function (err) {
              return caches
                .open(CACHE)
                .then(function (cache) {
                  return cache.match(event.request);
                })
                .catch(console.error);
            });
        }
      })
      .catch(console.error)
  );
});

self.addEventListener('activate', (e) => {
  const cleanObsoleteCache = () =>
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          console.log('Check key : ', key);
          if (CACHE.indexOf(key) === -1) {
            console.log('Clear cache : ', key);
            return caches.delete(key);
          }
        })
      );
    });

  e.waitUntil(
    cleanObsoleteCache()
  );
});

self.addEventListener('sync', function (event) {
  if (event.tag == 'favorite-sync') {
    console.log("sync")
    event.waitUntil(syncFavorite());
  }
});

const files = ["/",
 "/script.js", 
 "https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.css",
 "https://bulma.io/images/placeholders/1280x960.png",
 "https://bulma.io/images/placeholders/96x96.png", 
 "https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js"
];

function syncFavorite() {
  fetch(`http://localhost:3000/favorite?image=${encodeURIComponent(imagePath)}`)
    .then(function (response) {
      return response;
    })
    .then(function (text) {
      console.log('Request successful', text);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}