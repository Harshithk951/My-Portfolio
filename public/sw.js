/**
 * Custom Service Worker for Portfolo
 * Handles caching for assets to allow offline viewing and faster repeat loads.
 */

const CACHE_NAME = 'portfolio-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/robots.txt',
  '/sitemap.xml',
  '/cv.pdf',
  '/hero-profile-624w.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Strategy: Stale-while-revalidate for assets, Network-first for everything else
  const url = new URL(event.request.url);
  
  // Static assets and scripts
  if (
    url.origin === self.location.origin && 
    (url.pathname.startsWith('/assets/') || ASSETS_TO_CACHE.includes(url.pathname))
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        });

        return cachedResponse || fetchPromise;
      })
    );
  }
});
