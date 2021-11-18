import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Link } from "preact-router/match"

import { Theme } from "../../theme"


// import quicklink from "quicklink/dist/quicklink.mjs"
// quicklink()

const TextLink = (props) => {
  const theme = useContext(Theme)
  const className = theme.textLink ? cxs(theme.textLink) : null
  return (
    <Link className={className} {...props}>{props.children}</Link>
  )
}

export default TextLink
export { TextLink }
