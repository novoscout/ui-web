// This can be anything, but should probably match API version of the backend, or
// should be changed when there are significant changes to the assets.
const v = 'v1'

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(v).then(function(cache) {
      return cache.addAll([
        '/favicon.ico',
	'/assets/img/spinner.gif',
      ])
    })
  )
})
