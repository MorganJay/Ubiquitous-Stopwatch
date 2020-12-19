importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js"
);
self.addEventListener("install", (event) => {
  console.log("Inside the UPDATED install handler:", event);
});

self.addEventListener("activate", (event) => {
  console.log("Inside the activate handler:", event);
});

self.addEventListener(fetch, (event) => {
  console.log("Inside the fetch handler:", event);
});

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image', new workbox.strategies.CacheFirst()
);
