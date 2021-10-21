import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { TextLink as _TextLink } from "ui-shared/components"

import { Theme } from "../../theme"


// import quicklink from "quicklink/dist/quicklink.mjs"
// quicklink()

const TextLink = (props) => {
  const theme = useContext(Theme)
  const className = theme.textLink ? String(cxs(theme.textLink)) : null
  return (
    <_TextLink className={className} {...props}>{props.children}</_TextLink>
  )
}

export default TextLink
export { TextLink }
