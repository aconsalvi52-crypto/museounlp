const CACHE = 'red-museos-v1';
const ASSETS = [
  './', './index.html', './style.css', './app.js', './manifest.json',
  './assets/screens/inicio.png', './assets/screens/home.png', './assets/screens/agenda.png',
  './assets/screens/agenda-detail.png', './assets/screens/descubrir.png', './assets/screens/mapa-recorridos.png',
  './assets/screens/mapa-museo.png', './assets/screens/recorrido-arte.png', './assets/screens/perfil.png',
  './assets/screens/puntos.png', './assets/logo.png', './assets/fondo-inicio.png',
  './assets/categories/arte.png', './assets/categories/ciencia.png', './assets/categories/naturaleza.png',
  './assets/categories/memoria.png', './assets/categories/categorias-strip.png'
];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener('fetch', event => event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request))));
