const CACHE = "v1";

const ASSETS = [
    "/",
    "/index.html",
    "/offline.html",
    "/favicon.ico",
    "/styles/",
    "/styles/style.css",
    "/scripts/",
    "/scripts/app.js",
    "/scripts/image.js",
    "/assets/",
    "/assets/icons/",
    "/assets/icons/icon48.png",
    "/assets/icons/icon72.png",
    "/assets/icons/icon96.png",
    "/assets/icons/icon144.png",
    "/assets/icons/icon168.png",
    "/assets/icons/icon192.png",
    "/assets/imgs/",
    "/assets/imgs/bordmer.jpg",
    "/assets/imgs/ecluse.jpg",
    "/assets/imgs/monte_perdido.jpg",
    "/assets/imgs/pc.jpg",
    "/assets/imgs/plaine.jpg",
    "/assets/imgs/port.jpg",
    "/assets/imgs/imageDictionnary.js",
    "/assets/imgs/tiny/",
    "/assets/imgs/tiny/bordmer.jpg",
    "/assets/imgs/tiny/ecluse.jpg",
    "/assets/imgs/tiny/monte_perdido.jpg",
    "/assets/imgs/tiny/pc.jpg",
    "/assets/imgs/tiny/plaine.jpg",
    "/assets/imgs/tiny/port.jpg",
    "/assets/imgs/tiny/tinyImageDictionnary.js",
];
this.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE).then(function (cache) {
            return cache.addAll(ASSETS);
        })
        .catch(console.error)
    );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
            if (response) {
                return response;     // if valid response is found in cache return it
            } else {
                return fetch(event.request)     //fetch from internet
                .then(function(res) {
                    return caches.open(CACHE)
                    .then(function(cache) {
                        cache.put(event.request.url, res.clone());    //save the response for future
                        return res;   // return the fetched data
                    })
                })
                .catch(function(err) {       // fallback mechanism
                    return caches.open(CACHE)
                    .then(function(cache) {
                        return cache.match('/offline.html');
                    });
                });
            }
        })
    );
});
