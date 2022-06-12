require("isomorphic-fetch");

const isOnline = require("../helpers/isOnline");
const storage = require("../helpers/storage");
const shrinkTitle = require("../helpers/shrinkTitle");

// For future reference, genius way of comparing semver strings:
// https://stackoverflow.com/a/65687141
// Not actually using it, but it might come in handy!

// This var can be used to change versions of the local storage
// cache. For example, to start new caches vs revoking old.
const localVersion = 1;

var apiHost = process.env.apiScheme + "://" + process.env.apiHostname;
if (process.env.apiPort) {
  apiHost = apiHost + ":" + process.env.apiPort;
}
const apiUrlBase = apiHost + "/v1";

// The number of "levels of detail" that the summarised text
// from the real API will be broken into.
const numLevelsOfDetail = 5;

// A crummy cache :)
const crummyCache = {
  "remove": function(key) {
    const k = storageKey(key);
    storage.removeItem(k);
  },
  "set": function(key,val) {
    const k = storageKey(key);
    // const previous = JSON.parse(storage.getItem(k) || '{}');
    storage.setItem(k, JSON.stringify(val));
  },
  "get": function(key) {
    var ret;
    if (typeof(key) == "string") {
      try {
        ret = storage.getItem(key)
      } catch { }
    } else {
      ret = storage.getItem(storageKey(key))
      try {
      } catch { }
    }
    try {
      ret = JSON.parse(ret)
    } catch { }
    return ret
  },
  "keys": function() {
    try {
      return storage._keys || Object.keys(storage) || []
    } catch (err) {
      console.debug(err)
      return []
    }
  }
}

const storageKey = (o) => {
  // Ensure keys are generated in a consistent manner.
  // JSON.stringify introduces issues with quotes, so template strings are used instead.
  const {
    documentType, documentIDType, documentID,
    delayedActionName, delayedActionData } = o || {};

  if (documentType && documentIDType && documentID) {
    return `\{"version":"${localVersion}","type":"${documentType}","${documentIDType}":"${documentID}"\}`
  }

  // Store actions for processing later, e.g. when off-line.
  if (delayedActionName) {
    if (delayedActionData) {
      const d = JSON.stringify(delayedActionData);
      return `\{"version":"${localVersion}","type":"delayedAction","name":"${delayedActionName}","data":"${d}"\}`
    }
    return `\{"version":"${localVersion}","type":"delayedAction","name":"${delayedActionName}"\}`
  }
}

const getArticle = async (o) => {
  const { doi, apikey, cache } = o || {cache:true};
  if (! apikey) {
    return new Promise((resolve,reject) => { reject("No API key provided.") })
  }

  const _doi = typeof(doi) == "string" ? doi.toLowerCase() : undefined

  let article = undefined

  const online = await isOnline()

  if (cache || ! online) {
    if (_doi) {
      try {
        article = crummyCache.get({
          documentType: "article",
          documentIDType: "doi",
          documentID: _doi
        });
        if (article) {
          return new Promise((resolve,reject) => {
            resolve(article)
          })
        }
      } catch (err) {
        console.debug(err) // FIXME
      }
    }
  }
  if ( ! online) {
    // Try to return a random item from the cache.
    try {
      return new Promise((resolve,reject) => {
        resolve(
          api.cache.get(
            // FIXME Maybe make the cache responsible for filtering.
            api.cache.keys().filter( i => ["apikey","theme"].indexOf(i) == -1 )[
              Math.floor(Math.random() * api.cache.keys().length)
            ]
          )
        )
      })
    } catch {
      return new Promise((resolve,reject) => {
        reject("Not online and could not find anything in cache!")
      })
    }
  }

  // Fetch a random article from API.
  // Shrink the title.
  // Add article to cache.

  return new Promise((resolve,reject) => {
    fetch(
      apiUrlBase + "/document/doi", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": String(apikey)
        },
        method: "GET",
        mode: "cors"
    }).then( r => {
      if (r.ok) { return r.json() } else { reject("API problem: " + String(r)) }
    }).then( j => {
      resolve( (() => {
        const data = (j||{}).data || []
        if (data.length > 0) {
          const article = (((data[0]||{}).attributes||{}).json||{}).article
          if (article) {
            if (article.front) {
              article.front["article-meta"]["title-group"]["article-title-shrunk"] =
                shrinkTitle(article.front["article-meta"]["title-group"]["article-title"]);
              const aid = (article.front["article-meta"] || {})["article-id"]
              if (aid && aid["@pub-id-type"] && aid["@pub-id-type"] == "doi" && aid["#text"]) {
                crummyCache.set({
                  documentType: "article",
                  documentIDType: "doi",
                  documentID: aid["#text"]
                }, article);
              }
            }
            return article
          }
        }
      })())
    })
  })
}

const doiKeysFromCache = () => {
  return crummyCache.keys().filter((i) => {
    try {
      let tmp = JSON.parse(i);
      if ((tmp || {}).type == "article" && (tmp || {}).doi){
        return true
      }
    } catch (err) {
      // Ignore JSON.parse errors.
      if (err.name != "SyntaxError") { throw err }
    }
  })
}

const getRecommended = async (o) => {
  const { doi, apikey, cache } = o || {cache:true};
  if (! apikey) {
    return new Promise((resolve,reject) => { reject("No API key provided.") })
  }

  const _doi = typeof(doi) == "string" ? doi.toLowerCase() : undefined
  if (! _doi) {
    return new Promise((resolve,reject) => { reject("DOI must be provided.") })
  }

  if (cache || ! await isOnline()) {
    const cacheKeys = doiKeysFromCache();
    const ret = [];
    for (const key of cacheKeys) {
      try {
        ret.push(JSON.parse(storage.getItem(key)))
      } catch(err) {
        // Log JSON.parse errors but continue. Throw others.
        if (err.name == "SyntaxError") {
          console.debug(err)
        } else {
          throw err
        }
      }
    }
    return new Promise((resolve,reject) => { resolve(ret) })
  } else {
    // Fetch recommended article from API.
    // Shrink the title.
    // Add article to cache.

    return new Promise((resolve,reject) => {
      fetch(
        apiUrlBase + "/recommend/doi/" + String(doi || ""), {
          headers: {
            "Content-Type": "application/json",
            "Authorization": String(apikey)
          },
          method: "GET",
          mode: "cors"
      }).then( r => {
        if (r.ok) {
          return r.json()
        } else {
          reject(r)
        }
      }).then( j => {
        const article = (((((j||{}).data||[])[0]||{}).attributes||{}).json||{}).article
        resolve( (() => {
          if (article) {
            if (article.front) {
              article.front["article-meta"]["title-group"]["article-title-shrunk"] =
                shrinkTitle(article.front["article-meta"]["title-group"]["article-title"]);
              const aid = (article.front["article-meta"] || {})["article-id"]
              if (aid && aid["@pub-id-type"] && aid["@pub-id-type"] == "doi" && aid["#text"]) {
                crummyCache.set({
                  documentType: "article",
                  documentIDType: "doi",
                  documentID: aid["#text"]
                }, article);
              }
            }
          }
          return article
        })())
      })
    })
  }
}

const recordUserNavigateBetweenDocs = (o) => {
  const { from, to, apikey } = o || {};
  if (! apikey || ! to) {
    return new Promise((resolve,reject) => {
      reject("Need both of: apikey, to.")
    })
  }

  const payload = JSON.stringify({
    from_doi: from.doi,
    to_doi: to.doi
  })
  return Promise.all([
    fetch(
      apiUrlBase +
      "/graph/user/action/user_navigated_between_docs/",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": String(apikey)
        },
        method: "POST",
        mode: "cors",
        body: payload
    }).then( r => {
      if (! r.ok) { reject("API problem: " + String(r)) }
    })
  ]).catch( (err) => {
    // FIXME
  })
}

const recordUserShareDOI = (o) => {
  const { doi, apikey } = o || {};
  if (! apikey || ! doi) {
    return new Promise((resolve,reject) => {
      reject("Need all of: apikey, doi.")
    })
  }

  // FIXME! Implement this! :)
}

// const getAPIKey = (passphrase) => {
//   const payload = JSON.stringify({passphrase:passphrase})
//   return new Promise((resolve,reject) => {
//     fetch(
//       apiUrlBase + "/login/apikey", {
//         headers: {
//           "Content-Type": "application/json"
//         },
//         method: "POST",
//         mode: "cors",
//         body: payload
//     }).then( r => {
//       if (r.ok) { return r.json() } else { reject("API problem: " + String(r)) }
//     }).then( j => {
//       try {
//         resolve(j.data[0].attributes)
//       } catch(err) {
//         reject("Data structure problem: " + String(j))
//       }
//     })
//   })
// }

const login = (o) => {
  const { username, passphrase } = o || {}
  const payload = JSON.stringify({username,passphrase})
  return new Promise((resolve,reject) => {
    fetch(
      apiUrlBase + "/login", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        mode: "cors",
        body: payload
    }).then( r => {
      if (r.ok) { return r.json() } else { reject("API problem: " + String(r)) }
    }).then( j => {
      try {
        resolve(j.data[0].attributes)
      } catch(err) {
        reject("Data structure problem: " + String(j))
      }
    })
  })
}

// const register = (o) => {
//   const { username, passphrase, permit } = o || {};
//   const payload = JSON.stringify({username,passphrase,permit})
//   return new Promise((resolve,reject) => {
//     fetch(
//       apiUrlBase + "/register", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         mode: "cors",
//         body: payload
//       }
//     ).then( r => {
//       if (r.ok) { return r.json() } else { reject(r) }
//     }).then( j => {
//       try {
//         resolve(j.data[0].attributes)
//       } catch(err) {
//         reject("Data structure problem: " + String(j))
//       }
//     }).catch( e => {
//       reject("API problem: " + String(e))
//     })
//   })
// }

const register = (o) => {
  const { username, passphrase, permit } = o || {}
  const payload = JSON.stringify({username,passphrase,permit})
  return new Promise((resolve,reject) => {
    fetch(
      apiUrlBase + "/register", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        mode: "cors",
        body: payload
    }).then( r => {
      if (r.ok) {
        return r.json()
      } else {
        reject(r)
      }
    }).then( j => {
      resolve(j)
    }).catch((err) => {
      return false
    })
  })
}

const validAPIKey = async (o) => {
  const { apikey } = o || {};
  const { key } = { key: apikey, ...o }
  if ((!apikey) || (!key)) {
    return new Promise((resolve,reject) => {
      reject("Both apikey and key are required.")
    })
  } else {
    // Can only be done when online.
    const payload = JSON.stringify({key})
    return new Promise((resolve,reject) => {
      fetch(
        apiUrlBase + "/valid/apikey", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": String(apikey)
          },
          method: "POST",
          mode: "cors",
          body: payload
      }).then( r => {
        return r.json()
      }).then( j => {
        try {
          if (j.data[0].attributes.apikey) {
            resolve(true)
          }
        } catch(err) {
          reject()
        }
      })
    }).catch((err) => {
      return false
    })
  }
}

const api = {
  cache: crummyCache,
  doiKeysFromCache,
  getArticle,
  getRecommended,
  login,
  numLevelsOfDetail,
  recordUserNavigateBetweenDocs,
  recordUserShareDOI,
  register,
  storageKey,
  validAPIKey,
};

module.exports = api;
