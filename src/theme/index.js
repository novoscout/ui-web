// Inspired by and mimics:
// https://styled-system.com/api/

// Naming approach derived from:
// https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676

// Semantic, not declarative. In other words, this:
//     color.primary
// Not this:
//     color.green

import { createContext } from "preact"
import merge from "merge"

import common from "./common"
import light from "./light"
import dark from "./dark"

const lightTheme = merge.recursive(true, common, light)
const darkTheme = merge.recursive(true, common, dark)

const Theme = createContext("theme")

const exp = {
  Theme: Theme,
  lightTheme: lightTheme,
  darkTheme: darkTheme
}

export default exp
export { Theme, lightTheme, darkTheme }
