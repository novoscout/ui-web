import { h } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Theme } from "../../theme"
import { Summary as _Summary } from "ui-shared/components"

const Summary = (props) => {
  const theme = useContext(Theme)
  const className = theme.summary
        ? cxs(theme.summary)
        : null
  return (
    <_Summary className={className} {...props}>{props.children}</_Summary>
  )
}

export default Summary
export { Summary }
