// These should be before importing (P)React, preferably the *first* imports.
if (process.env.development) {
  const devtools = require("preact/devtools")
  const debug = require("preact/debug")
}

import { h, render } from "preact"
import UI from './UI'

render(
  <UI />,
  document.getElementById("app")
)
