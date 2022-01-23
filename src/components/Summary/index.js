import { h } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Theme } from "../../theme"
import { Summary as _Summary } from "ui-shared/components"

const Summary = (props) => {
  const theme = useContext(Theme)
  const className = theme.summary
                  ? cxs(theme.summary) +
                    props.className ? " " + props.className : ""
                  : null
  const linkClassName = theme.textLink
                      ? cxs(theme.textLink)
                      : null
  return (
    <_Summary className={className} {...props}><span className={linkClassName}>{props.children}</span></_Summary>
  )
}

export default Summary
export { Summary }
