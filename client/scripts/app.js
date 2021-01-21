const publicVapidKey = "BOz-y7a0En0i6slG6L - jMR6EmwTel18PAO8CLX0ECOIWeNGYo3DKXdMwN0LrmpulqE1CKl6VUMCQRW9 - _7iXU8Y"

window.addEventListener("load", (e) => {
    const message = document.getElementById('offline-message');
    if(navigator.onLine) {
        message.style.display = "none";
    } else {
        message.style.display = "block";
    }
});

window.addEventListener('online', event => { 
    console.log("online");
    document.getElementById('offline-message').style.display = "none";
});

window.addEventListener('offline', event => { 
    console.log("offline");
    document.getElementById('offline-message').style.display = "block";
});

window.addEventListener('load', (e) => {
    console.log("match media result :", window.matchMedia('(display-mode: standalone)'));   
    if (window.matchMedia('(display-mode: standalone)').matches) {
        document.getElementById('install_button').style.display = 'none';
    }
    // Use serviceWorker.ready to ensure that you can subscribe for push
    navigator.serviceWorker.ready.then(
        function (serviceWorkerRegistration) {
            var options = {
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            };
            serviceWorkerRegistration.pushManager.subscribe(options).then(
                function (pushSubscription) {
                    console.log(pushSubscription.endpoint);
                    // The push subscription details needed by the application
                    // server are now available, and can be sent to it using,
                    // for example, an XMLHttpRequest.
                }, function (error) {
                    // During development it often helps to log errors to the
                    // console. In a production environment it might make sense to
                    // also report information about errors back to the
                    // application server.
                    console.log(error);
                }
            );
        });
});

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    let deferredPrompt = e;
    const installButton = document.getElementById('install_button');
    
    installButton.addEventListener('click', (e) => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('A2HS prompt accepted');
            } else {
                console.log('A2HS prompt declined');
            }
            deferredPrompt = null;
        });
        installButton.style.display = 'none';
    }); 
});