import { createContext } from "preact"
import { mergeDeep } from "../helpers/mergeDeep"

import common from "./common"
import light from "./light"
import dark from "./dark"

const lightTheme = mergeDeep({}, common, light)
const darkTheme = mergeDeep({}, common, dark)

// Default to light theme.
const Theme = createContext(lightTheme)

const exp = {
  Theme: Theme,
  lightTheme: lightTheme,
  darkTheme: darkTheme
}

export default exp
export { Theme, lightTheme, darkTheme }
