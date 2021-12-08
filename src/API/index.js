const deepmerge = require("deepmerge");

const fetch = require("../helpers/fetch");
const isOnline = require("../helpers/isOnline")
const storage = require("../helpers/storage");

const fakeData = require("./data.json");

var apiHost = process.env.apiScheme + "://" + process.env.apiHostname;
if (process.env.apiPort) {
  apiHost = apiHost + ":" + process.env.apiPort;
}

const shouldUseCache = async (cache) => {
  if (! await isOnline()) {
    return true;
  }
  return cache == undefined || cache == true
       ? true
       : false;
}

const crummyCache = {
  "setOrAdd": function(key,val) {
    const previous = JSON.parse(storage.getItem(key) || '{}');
    const updated = deepmerge.all([ previous, val ]);
    storage.setItem(key, JSON.stringify(updated));
  },
  "get": function(key) {
    return JSON.parse(storage.getItem(key))
  },
  "keys": function() {
    try {
      if (storage._keys) {
        return storage._keys
      } else {
        return Object.keys(storage) || []
      }
    } catch (err) {
      return []
    }
  }
}

const generateStorageKey = (o) => {
  // Ensure keys are generated in a consistent manner.
  // JSON.stringify introduces issues with quotes, so template literals are used instead.
  const {
    documentType, documentIDName, documentID,
    delayedActionName, delayedActionData } = o || {};
  if (documentType && documentIDName && documentID) {
    return `\{"type":"${documentType}","${documentIDName}":"${documentID}"\}`
  }
  if (delayedActionName) {
    if (delayedActionData) {
      const d = JSON.stringify(delayedActionData)
      return `\{"type":"delayedAction","name":"${delayedActionName}","data":"${d}"\}`
    }
    return `\{"type":"delayedAction","name":"${delayedActionName}"\}`
  }
}

const getArticleByDOI = (o) => {
  const { doi, apikey, cached } = o;
  if (! apikey) {
    return new Promise((resolve,reject) => { reject("No API key provided.") })
  }

  const useCache = await shouldUseCache(cache);

  if (useCache) {
    try {
      storageKey = generateStorageKey({
        documentType: "article",
        documentIDName: "doi",
        documentID: doi
      });
      const article = crummyCache.get(storageKey)
      if (article) {
        return new Promise((resolve,reject) => {
          resolve(article)
        })
      } else {
        return new Promise((resolve,reject) => {
          reject("article",article)
        })
      }
    } catch (err) {
      console.debug(err)
    }
  }
}

const getGraph = (o) => {
  const { doi, apikey } = o;
  if (! apikey) {
    return new Promise((resolve,reject) => { reject("No API key provided.") })
  }

  for (const item of fakeData) {
    if ("article" in item && "doi" in item.article) {
      storageKey = generateStorageKey({
        documentType: "article",
        documentIDName: "doi",
        documentID: item.article.doi
      });
      crummyCache.setOrAdd(storageKey, item);
    }
  }

  return new Promise((resolve,reject) => {
    resolve(fakeData)
    // fetch(
    //   apiHost + "/v1/graph/doi/" + String(doi || ""), {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": String(apikey)
    //     },
    //     method: "GET",
    //     mode: "cors"
    // }).then( r => {
    //   if (r.ok) { return r.json() } else { reject(r) }
    // }).then( j => {
    //   resolve(j)
    // })
  })
}

const recordUserNavigateFromDOIToDOI = (o) => {
  const { doiA, doiB, apikey } = o;
  if (! apikey || ! doiA || ! doiB) {
    return new Promise((resolve,reject) => {
      reject("Need all of: apikey, doiA, doiB.")
    })
  }

  return Promise.all([
    fetch(
      apiHost +
      "/v1/graph/user/action/user_navigated_from/doi/" +
      String(doiA), {
        headers: {
          "Content-Type": "application/json",
          "Authorization": String(apikey)
        },
        method: "POST",
        mode: "cors"
    }).then( r => {
      if (! r.ok) { reject(r) }
    }),
    fetch(
      apiHost +
      "/v1/graph/user/action/user_navigated_to/doi/" +
      String(doiB), {
        headers: {
          "Content-Type": "application/json",
          "Authorization": String(apikey)
        },
        method: "POST",
        mode: "cors"
    }).then( r => {
      if (! r.ok) { reject(r) }
    })
  ]).catch( (err) => {
    // FIXME
  })
}

const recordUserShareDOI = (o) => {
  const { doi, apikey } = o;
  if (! apikey || ! doi) {
    return new Promise((resolve,reject) => {
      reject("Need all of: apikey, doi.")
    })
  }
}

const register = () => {
  return new Promise((resolve,reject) => {
    fetch(apiHost + "/v1/register").then( r => {
      if (r.ok) { return r.json() } else { reject(r) }
    }).then( j => {
      try {
        resolve(j.data[0].attributes)
      } catch(err) {
        reject(j)
      }
    }).catch( e => {
      reject(e)
    })
  })
}

const getAPIKey = (passphrase) => {
  const payload = JSON.stringify({passphrase:passphrase})
  return new Promise((resolve,reject) => {
    fetch(
      apiHost + "/v1/login/apikey", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        mode: "cors",
        body: payload
    }).then( r => {
      if (r.ok) { return r.json() } else { reject(r) }
    }).then( j => {
      try {
        resolve(j.data[0].attributes)
      } catch(err) {
        reject(j)
      }
    })
  })
}

const api = {
  cache: crummyCache,
  generateStorageKey,
  getGraph,
  getArticleByDOI,
  recordUserNavigateFromDOIToDOI,
  recordUserShareDOI,
  getAPIKey,
  register,
  shouldUseCache
};

// export default api
// export { api }
module.exports = api;
