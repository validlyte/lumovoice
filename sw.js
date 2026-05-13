// LumoVoice Service Worker — GitHub Pages compatible
const CACHE = 'lumovoice-v3';
 
// On install, skip waiting immediately
self.addEventListener('install', () => self.skipWaiting());
 
// On activate, clear ALL old caches and take control
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
 
// For everything: try network first, fall back to cache
self.addEventListener('fetch', event => {
  // Don't touch Firebase or Google API requests — let them go direct
  const url = event.request.url;
  if (
    url.includes('firebaseio.com') ||
    url.includes('firebasestorage') ||
    url.includes('googleapis.com') ||
    url.includes('gstatic.com')
  ) {
    return; // browser handles it normally
  }
 
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache a copy of successful responses
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(c => c.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request)) // offline fallback
  );
});
