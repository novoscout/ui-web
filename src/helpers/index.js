const shrinkTitle = require("./shrinkTitle")
import { DOI } from "./doi"
import { registerServiceWorker } from "./registerServiceWorker"
const storage = require("./storage")

export default {
  DOI,
  registerServiceWorker,
  shrinkTitle,
  storage,
}

export {
  DOI,
  registerServiceWorker,
  shrinkTitle,
  storage,
}
