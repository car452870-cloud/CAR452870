// Service worker mínimo: guarda a página para abrir depressa; os dados vêm sempre do servidor.
var C = 'condominio-v1';
self.addEventListener('install', function (e) { e.waitUntil(caches.open(C).then(function (c) { return c.addAll(['./', 'icon-192.png']); })); self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) { var c2 = r.clone(); caches.open(C).then(function (c) { c.put(e.request, c2); }); return r; }).catch(function () { return caches.match(e.request); }));
});
