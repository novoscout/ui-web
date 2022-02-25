const shrinkTitle = require("./shrinkTitle")
import { DOI } from "./doi"
const getObjProp = require("./getObjProp")
const isOnline = require("./isOnline")
import { registerServiceWorker } from "./registerServiceWorker"
const storage = require("./storage")

export default {
  DOI,
  getObjProp,
  isOnline,
  registerServiceWorker,
  shrinkTitle,
  storage,
}

export {
  DOI,
  getObjProp,
  isOnline,
  registerServiceWorker,
  shrinkTitle,
  storage,
}
