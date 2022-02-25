const shrinkTitle = require("./shrinkTitle")
import { DOI } from "./doi"
const getObjProp = require("./getObjProp")
import { registerServiceWorker } from "./registerServiceWorker"
const storage = require("./storage")

export default {
  DOI,
  getObjProp,
  registerServiceWorker,
  shrinkTitle,
  storage,
}

export {
  DOI,
  getObjProp,
  registerServiceWorker,
  shrinkTitle,
  storage,
}
