// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '799694463735'
});

const messaging = firebase.messaging();


navigator.serviceWorker.ready.then(function(registration) {
    payload.notification.data = payload.notification; // параметры уведомления
    registration.showNotification(payload.notification.title, payload.notification);
}).catch(function(error) {
    console.log('ServiceWorker registration failed', error);
});

// messaging-sw.js
self.addEventListener('notificationclick', function(event) {
    const target = event.notification.data.click_action || '/';
    event.notification.close();

    // этот код должен проверять список открытых вкладок и переключатся на открытую
    // вкладку с ссылкой если такая есть, иначе открывает новую вкладку
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function(clientList) {
        // clientList почему-то всегда пуст!?
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == target && 'focus' in client) {
                return client.focus();
            }
        }

        // Открываем новое окно
        return clients.openWindow(target);
    }));
});
