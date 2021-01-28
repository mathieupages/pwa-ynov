function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('../sw.js' , {scope: './',})
      .then(function (reg) {
        console.log('Registration succeeded. Scope is ' + reg.scope, reg);
        reg.onupdatefound = (event) => {
          const installingWorker = reg.installing;
          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  console.log("update available");
                  document.getElementById('new-update-message').style.display = "block";
                }
                break;
            }
          };
        };
      })
      .catch(function (error) {
        console.log('Registration failed with ' + error);
      });
  }
    navigator.serviceWorker.ready.then(function (swRegistration) {
        console.log('favorite-sync')
        return swRegistration.sync.register('favorite-sync')
    })
}

function toggleOfflineMessage(isOffline) {
  const message = document.getElementById('offline-message');
  message.style.display = isOffline ? 'block' : 'none';
}

function toggleInstallButton() {
  console.log(
    'match media result :',
    window.matchMedia('(display-mode: standalone)')
  );
  if (window.matchMedia('(display-mode: standalone)').matches) {
    document.getElementById('install_button').style.display = 'none';
  }
}

window.addEventListener('load', (e) => {
  initServiceWorker();
  initGallery();
  toggleInstallButton();
  toggleOfflineMessage(!navigator.onLine);
  requestGrantNotification();
  addLoveWithPictureSubscription();
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

window.addEventListener('online', (_event) => {
  console.log('online');
  toggleOfflineMessage(false);
});

window.addEventListener('offline', (_event) => {
  console.log('offline');
  toggleOfflineMessage(true)
});
