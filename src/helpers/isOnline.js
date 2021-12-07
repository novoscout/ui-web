// Inspired by https://github.com/sindresorhus/is-online
// and https://italonascimento.github.io/applying-a-timeout-to-your-promises/

try { const realFetch = fetch } catch(err) {
  fetch = import("./fetch.js").then(({default: fetch}) => fetch);
}

const promiseTimeout = function(ms, p){
  // Create a promise that rejects in <ms> milliseconds
  let timeoutPromise = new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject("Time ran out after " + ms + "milliseconds.");
    }, ms)
  })
  // Returns a race between timeout and the passed-in promise
  return Promise.race([p, timeoutPromise])
}

module.exports = async (opts) => {
  try {
    if (navigator && (! navigator.onLine)) {
      return Promise.any([
        new Promise((resolve,reject) => { reject("navigator.onLine was not true.") })
      ]).then((r) => {
        
      })
    }
  } catch(err) {
    //
  }
  var { sites, timeout } = opts || {};
  if (!timeout) {
    timeout = 2000;
  }
  if ((! sites) || (! sites.map)) {
    sites = [
      "https://icanhazip.com",
      "https://api.ipify.org",
      "https://google.com/404",
      "https://a0.awsstatic.com/404"
    ]
  }

  return await Promise.any(
    sites.map((site) => {
      return promiseTimeout(
        timeout,
        fetch(site).then((r) => {
          return true
        })
      )
    })
  ).catch((e) => {
    return false
  })
}
