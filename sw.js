const CACHE_NAME = "tripflow-v4-password-auth-20260920";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./supabase.js",
  "./supabase-config.js",
  "./manifest.webmanifest",
  "./Icons/icon.svg",
  "./Icons/icon-192.png",
  "./Icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const isNavigation = event.request.mode === "navigate";
  const isLocalAsset = url.origin === self.location.origin && !isNavigation;
  const isPublicRuntimeAsset =
    url.hostname === "cdn.jsdelivr.net" ||
    url.hostname === "images.unsplash.com";

  // Never cache Supabase REST/Auth/Storage responses or signed document URLs.
  if (!isNavigation && !isLocalAsset && !isPublicRuntimeAsset) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(isNavigation ? "./index.html" : event.request, copy));
        return response;
      })
      .catch(async () => {
        const hit = await caches.match(isNavigation ? "./index.html" : event.request);
        return hit || Response.error();
      })
  );
});
