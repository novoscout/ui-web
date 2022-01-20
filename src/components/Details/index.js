import { h } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Theme } from "../../theme"
import { Details as _Details } from "ui-shared/components"

const Details = (props) => {
  const theme = useContext(Theme)
  const className = theme.details
        ? cxs(theme.details)
        : null
  return (
    <_Details className={className} {...props}>{props.children}</_Details>
  )
}

export default Details
export { Details }
