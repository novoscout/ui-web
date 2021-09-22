// Courtesy https://github.com/mdn/sw-test/blob/gh-pages/app.js
// See also https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/src/registerServiceWorker.js
// and https://developers.google.com/web/fundamentals/primers/service-workers/registration

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/serviceWorker.js').then(function(reg) {
	if (process.env.NODE_ENV == 'development') {
	  // console.log("Attempting to register service worker...")
 	  if(reg.installing) {
            // console.log('Service worker installing')
 	  } else if(reg.waiting) {
            // console.log('Service worker installed')
 	  } else if(reg.active) {
            // console.log('Service worker active')
 	  }
	}
      }).catch(function(error) {
        console.log('Service worker registration failed with error: ' + error)
      })
    })
  }
}

export { registerServiceWorker }
