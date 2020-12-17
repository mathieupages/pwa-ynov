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

// this.addEventListener('beforeinstallprompt', function(event) {
//     // Prevent Chrome 67 and earlier from automatically showing the prompt
//     e.preventDefault();
//     // Stash the event so it can be triggered later.
//     // deferredPrompt = e;
//     e.preventDefault();
//     e.prompt();
// });

//   // Installation must be done by a user gesture! Here, the button click
// btnAdd.addEventListener('click', (e) => {
// // // hide our user interface that shows our A2HS button
// //     let deferredPrompt;
// //     btnAdd.style.display = 'none';
// //     // Show the prompt
// //     deferredPrompt.prompt();
// //     // Wait for the user to respond to the prompt
// //     deferredPrompt.userChoice
// //         .then((choiceResult) => {
// //             if (choiceResult.outcome === 'accepted') {
// //                 console.log('User accepted the A2HS prompt');
// //             } else {
// //                 console.log('User dismissed the A2HS prompt');
// //             }
// //             deferredPrompt = null;
// //         })
// //         .catch(console.error);
//     // e.preventDefault();
//     // e.prompt();
// });

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
                return response;
            } else {
                return fetch(event.request)
                .then(function(res) {
                    return caches.open(CACHE)
                    .then(function(cache) {
                        cache.put(event.request.url, res.clone());
                        return res;
                    })
                })
                .catch(function(err) {
                    return caches.open(CACHE)
                    .then(function(cache) {
                        return cache.match('/offline.html');
                    });
                });
            }
        })
    );
});
