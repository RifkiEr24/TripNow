const CACHE_NAME = "TripnowV6";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/pages/home.html",
  "/pages/transport.html",
  "/pages/Trip.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/index.js",
  "/js/reg-service-worker.js",
  "/assets/webfont/Poppins-Bold.woff",
  "/assets/webfont/Poppins-Regular.woff",
  "/assets/image/colosseum.jpg",
  "/assets/image/contact.png",
  "/assets/image/england.png",
  "/assets/image/england-london-british-museum-3.jpg",
  "/assets/image/england-london-national-gallery-3.jpg",
  "/assets/image/england-london-top-attractions-the-shard.jpg",
  "/assets/image/france.png",
  "/assets/image/italy.png",
  "/assets/image/japan.png",
  "/assets/image/japan-tokyo-asakusa-senso-ji-temple.jpg",
  "/assets/image/japan-tokyo-skytree.jpg",
  "/assets/image/japan-tokyo-ueno-park-zoo.jpg",
  "/assets/image/landing page image.png",
  "/assets/image/location.png",
  "/assets/image/london-top-attractions-whitehall-and-parliament.jpg",
  "/assets/image/Louvre-Museum-in-Paris.jpg",
  "/assets/image/new-york-city-brooklyn-bridge.jpg",
  "/assets/image/new-york-city-bryant-park.jpg",
  "/assets/image/new-york-city-statue-of-liberty.jpg",
  "/assets/image/new-york-times-square.jpg",
  "/assets/image/nezu.jpeg",
  "/assets/image/PANTHEON-1024x632.jpg",
  "/assets/image/paris-2017-home.jpg",
  "/assets/image/place-des-vosges-jardin-paris.jpg",
  "/assets/image/roman_forum.jpg",
  "/assets/image/san_giovanni_in_laterano.jpg",
  "/assets/image/st_peters_basilica.jpg",
  "/assets/image/transportation.png",
  "/assets/image/usa.png",
  "/assets/icon/apple-icon-180x180.png",
  "/assets/icon/icon-512x512.png",
  "/assets/icon/icon-384x384.png",
  "/assets/icon/icon-256x256.png",
  "/assets/icon/icon-192x192.png",
  "/assets/icon/icon-144x144.png",
  "/assets/icon/icon-128x128.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];

self.addEventListener("install",function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

self.addEventListener("activate",function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if(cacheName != CACHE_NAME){
                        console.log("ServiceWorker: cache "+ cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
