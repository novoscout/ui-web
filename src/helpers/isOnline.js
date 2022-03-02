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
  const { forceOffline } = { forceOffline:false, ...opts || {} };
  if (forceOffline || ((process || {}).env || {}).forceOffline) {
    return await new Promise((resolve,reject) => {
      reject()
    }).catch((e) => { return false })
  }
  const defaultSites = [
    "https://app.osteoscout.com/",
    "https://api.osteoscout.com/",
    "https://www.quad9.net/favicon.svg",
    "https://1.1.1.1/favicon.ico",
    "https://icanhazip.com/",
    "https://api.ipify.org/",
  ];
  const { sites, timeout } = { timeout:2000, sites:defaultSites, ...opts || {} };

  return await Promise.any(
    sites.map((site) => {
      return promiseTimeout(
        timeout,
        fetch(site,{
          cache: "no-cache",
          method: "GET",
          mode: "no-cors",
        }).then((r) => {
          return true
        })
      )
    })
  ).catch((e) => {
    return false
  })
}
