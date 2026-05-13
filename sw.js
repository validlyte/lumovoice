// PageVoice Service Worker
const CACHE_NAME = 'lumovoice-v2';
const PRECACHE = [
  '/lumovoice/',
  '/lumovoice/index.html',
  '/lumovoice/sw.js',
  '/lumovoice/manifest.json',
  '/lumovoice/icon-192.png',
  '/lumovoice/icon-512.png',
];

// External CDN resources to cache on first use
const CDN_CACHE = 'lumovoice-cdn-v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CDN_CACHE)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network-first for Firebase and API calls
  if (
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('firebasestorage') ||
    url.hostname.includes('googleapis.com')
  ) {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    return;
  }

  // Cache-first for CDN resources (PDF.js, Firebase SDKs, fonts)
  if (
    url.hostname.includes('cdnjs.cloudflare.com') ||
    url.hostname.includes('gstatic.com') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    event.respondWith(
      caches.open(CDN_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(resp => {
            cache.put(event.request, resp.clone());
            return resp;
          });
        })
      )
    );
    return;
  }

  // Cache-first for app shell
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
