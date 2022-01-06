// Inspired by https://github.com/sindresorhus/is-online
// and https://italonascimento.github.io/applying-a-timeout-to-your-promises/

require("isomorphic-fetch");

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
      return await new Promise((resolve,reject) => {
        reject()
      }).catch((e) => { return false })
    } else {
      throw new Error() // proceed to the below.
    }
  } catch (err) {
    const defaultSites = [
      "https://icanhazip.com",
      "https://api.ipify.org",
      "https://google.com/404",
      "https://a0.awsstatic.com/404",
      "https://a1.awsstatic.com/404",
      "https://cdn.jsdelivr.net/404",
      "https://www.fastly.io/404"
    ];
    const { sites, timeout } = { timeout:2000, sites:defaultSites, ...opts || {} };

    return await Promise.any(
      sites.map((site) => {
        return promiseTimeout(
          timeout,
          fetch(site).then((r) => {
            return true
          }).catch((e) => {
            return false
          })
        )
      })
    ).catch((e) => {
      return false
    })
  }
}
