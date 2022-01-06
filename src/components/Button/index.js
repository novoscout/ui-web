import { h } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Button as _Button } from "ui-shared/components"

import { Theme } from "../../theme"


const Button = (props) => {
  const theme = useContext(Theme)
  const className = theme.button
                  ? cxs(theme.button)
                  : null
  return (
    <_Button className={className} {...props}>{props.children}</_Button>
  )
}

export default Button
export { Button }
