// These should be before importing (P)React.
import devtools from "preact/devtools"
import debug from "preact/debug"

import { h, render } from "ui-shared/lib/react-preact"
import UI from './UI'

render(
  <UI />,
  document.getElementById("root")
)
