import { mergeDeep } from "../helpers/mergeDeep"

import common from "./common"
import light from "./light"
import dark from "./dark"

const theme = {
  light: mergeDeep({}, common, light),
  dark: mergeDeep({}, common, dark)
}

export default theme
export { theme }
