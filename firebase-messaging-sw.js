importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

var config = {
    messagingSenderId: "498518814155"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    	console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'http://api.upawa.com.br/redes/app/assets/images/touch-music-karaoke.jpg',
        vibrate: [200, 100, 200, 100, 200, 100, 400]
    };

    //console.log(localStorage.getItem('token'));

   self.addEventListener('notificationclick', function(event) {
        event.notification.close();
        event.waitUntil(clients.matchAll({
       	 type: 'window'
    	}).then(function (clientList) {
	        console.log("clients:" + clientList.length);
	        for (var i = 0; i < clientList.length; ++i) {
	            var client = clientList[i];
	            if (client.url === '/' && 'focus' in client) {
	                return client.focus();
	            }
	        }

	        if (clients.openWindow) {
	            return clients.openWindow(directory);
	        }
		}));
    });

    //console.log(payload);
    return self.registration.showNotification(notificationTitle, notificationOptions);


});
