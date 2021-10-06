// These should be before importing (P)React, preferably the *first* imports.
if (process.env.novoscout.development) {
  const devtools = require("preact/devtools")
  const debug = require("preact/debug")
}

import { h, render } from "preact"
import Whatever from './Whatever'

render(
  <Whatever />,
  document.getElementById("root")
)
