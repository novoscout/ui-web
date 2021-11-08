import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Toolbar as _Toolbar } from "ui-shared/components"

import { FAB } from "../FAB"
import { Theme } from "../../theme"


const Toolbar = (props) => {
  const theme = useContext(Theme)
  const className = theme.toolbar ? String(cxs(theme.toolbar)) : null
  return (
    <_Toolbar className={className} {...props}>
      <FAB toggleModal={props.toggleModal} />
    </_Toolbar>
  )
}

export default Toolbar
export { Toolbar }
