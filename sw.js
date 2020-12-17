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
    "/assets/imgs/imageDictionary.js",
    "/assets/imgs/tiny/",
    "/assets/imgs/tiny/bordmer.jpg",
    "/assets/imgs/tiny/ecluse.jpg",
    "/assets/imgs/tiny/monte_perdido.jpg",
    "/assets/imgs/tiny/pc.jpg",
    "/assets/imgs/tiny/plaine.jpg",
    "/assets/imgs/tiny/port.jpg",
    "/assets/imgs/tiny/tinyImageDictionary.js",
];

this.addEventListener("load", function (_event) {
    const installButton = document.getElementById("install_button");

    this.addEventListener("beforeinstallprompt", function (event) {
        event.preventDefault();

        installButton.addEventListener("click", (e) => {

            event.prompt();

            event.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the A2HS prompt");
                    caches.open(CACHE)
                        .then(function (cache) {
                            cache.put('isInstalled', true);
                        })
                        .catch(console.error);
                } else {
                    console.log("User dismissed the A2HS prompt");
                    installButton.style.display = "block";
                }
            });
        });
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
        installButton.style.display = "none";
    }
});


this.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE).then(function (cache) {
            return cache.addAll(ASSETS);
        })
        .catch(console.error)
    );
});

this.addEventListener('fetch', function (event) {
    console.log(
        "Request : [%s] %s",
        event.request.method,
        event.request.url,
    );

    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request)
                    .then(function(res) {
                        return caches.open(CACHE)
                            .then(function(cache) {
                                cache.put(event.request.url, res.clone());
                                return res;
                            })
                            .catch(console.error)
                    })
                    .catch(function(err) {
                        return caches.open(CACHE)
                            .then(function(cache) {
                                return cache.match('/offline.html');
                            })
                            .catch(console.error);
                    });
            }
        })
        .catch(console.error)
    );
});
