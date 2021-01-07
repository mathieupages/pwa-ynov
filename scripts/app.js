window.addEventListener("load", (e) => {
    if(navigator.onLine) {
        const message = document.getElementById('offline-message');
        message.style.visibility = "hidden";
    }
});

window.addEventListener('online', event => { 
    console.log("online");
    const message = document.getElementById('offline-message');
    message.style.visibility = "hidden";
});

window.addEventListener('offline', event => { 
    console.log("offline");
    const message = document.getElementById('offline-message');
    message.style.visibility = "visible";
});

window.addEventListener('load', (e) => {
    const btn = document.getElementById('install_button');
    console.log("match media result :", window.matchMedia('(display-mode: standalone)'));   
    if (window.matchMedia('(display-mode: standalone)').matches) {
        btn.style.display = 'none';
    }
});

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    let deferredPrompt = e;
    const btn = document.getElementById('install_button');

    btn.addEventListener('click', (e) => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('A2HS prompt accepted');
            } else {
                console.log('A2HS prompt declined');
            }
            deferredPrompt = null;
        });
    }); 
});
