const vapidPublicKey =
  'BOz-y7a0En0i6slG6L-jMR6EmwTel18PAO8CLX0ECOIWeNGYo3DKXdMwN0LrmpulqE1CKl6VUMCQRW9-_7iXU8Y';

const loveWithPictureOptions = {
  applicationServerKey: urlB64ToUint8Array(vapidPublicKey),
  userVisibleOnly: true,
};

function addLoveWithPictureSubscription() {
  navigator.serviceWorker.ready.then(async (serviceWorkerRegistration) => {
    const subscription = await serviceWorkerRegistration.pushManager.subscribe(
      loveWithPictureOptions
    );

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/sub', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(subscription));
  });
}

function requestGrantNotification() {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      const notification = new Notification('Ma Seconde Notification');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          const notification = new Notification('Ma Première Notification');
        }
      });
    }
  }
}

function subscribeLoveWithPictureNotification(_event) {
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
        serviceWorkerRegistration.pushManager
        .subscribe({
            userVisibleOnly: true,
            applicationServerKey: vapidPublicKey,
        })
        .then((_subscription) => {
            console.log(_subscription);
            Notification.requestPermission((permission) => {
            if (permission === 'granted') {
                const notification = new Notification(
                "You're falling in love"
                );
            }
            });
        });
    });
}
