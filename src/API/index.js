// FIXME Implement local cache, and force over-ride of cache.

try { Promise = Promise } catch(err) { Promise = require("promise-polyfill") }
try { fetch = fetch } catch(err) { fetch = require("whatwg-fetch").fetch }

const fakeData = require("./data.json");

import storage from "../helpers/storage";
import deepmerge from "deepmerge";

var apiHost = process.env.apiScheme + "://" + process.env.apiHostname;
if (process.env.apiPort) {
  apiHost = apiHost + ":" + process.env.apiPort;
}

const crummyCache = {
  updateOrAdd: function(k,v) {
    const c = JSON.parse(storage.getItem(k) || '{}');
    const o = deepmerge.all([ c, v ]);
    storage.setItem(k,JSON.stringify(o));
  }
}

const getGraph = (o) => {
  const { doi, apikey } = o;
  if (! apikey) {
    return new Promise((resolve,reject) => { reject("No API key provided.") })
  }

  for (const i of fakeData) {
    if ("article" in i && "doi" in i.article) {
      crummyCache.updateOrAdd(i.article.doi, i);
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
  getGraph,
  recordUserNavigateFromDOIToDOI,
  recordUserShareDOI,
  getAPIKey,
  register
};

export default api
export { api }
