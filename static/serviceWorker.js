// Remember, service workers DON'T WORK IN PRIVATE BROWSING MODE!

// Service workers are a royal pain.
// https://gist.github.com/Rich-Harris/fd6c3c73e6e707e312d7c5d7d0f3b2f9
// https://stackoverflow.com/q/39136625

// Also, Nginx must serve the worker with the header "Service-Worker-Allowed"
// and an appropriate scope.

// const version = 'v1' // Can be anything, but matching API seems sensible.

console.log('Started', self);

this.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log("Installed:",event)
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll([
        "/assets/css/base.css",
        "/assets/css/print.css",
        "/assets/font/noto-serif-400-latin-ext.woff2",
        "/assets/font/noto-serif-400-latin.woff2",
        "/assets/font/noto-serif-italic-400-latin-ext.woff2",
        "/assets/font/noto-serif-italic-400-latin.woff2",
        "/assets/font/zilla-slab-700-latin-ext.woff2",
        "/assets/font/zilla-slab-700-latin.woff2",
        "/assets/img/offline.png",
        "/assets/img/spinner.gif",
        "/assets/img/share.svg",
        "/assets/js/share-min.js",
        "favicon.ico",
      ])
    })
  )
})
