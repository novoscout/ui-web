// These should be before importing (P)React, preferably the *first* imports.
if (process.env.novoscout.development) {
  const devtools = require("preact/devtools")
  const debug = require("preact/debug")
}

import { h, render } from "preact"
import UI from './UI'

render(
  <UI />,
  document.getElementById("root")
)
