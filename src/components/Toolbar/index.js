import { h } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Toolbar as _Toolbar } from "ui-shared/components"

import { FAB } from "../FAB"
import { Theme } from "../../theme"


const Toolbar = (props) => {
  const theme = useContext(Theme)
  const className = theme.toolbar
                  ? cxs(theme.toolbar) + " not-print"
                  : null
  return (
    <_Toolbar id="toolbar" className={className} {...props}>
      <FAB onclick={props.toggleModal} />
    </_Toolbar>
  )
}

export default Toolbar
export { Toolbar }
