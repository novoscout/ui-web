// FIXME Implement local cache, and force over-ride of cache.

const data = require("../components/Desk/data.json")

const api = {}

api.getGraph = (i) => {
  return data
}

export default api
export { api }
