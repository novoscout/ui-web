import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { NavAction } from "../NavAction"

import { Theme } from "../../theme"


const NavActionShare = (props) => {
  const theme = useContext(Theme)
  const className = theme.navActionShare ? String(cxs({...theme.navActionShare})) : null
  return (
    <NavAction className={className} {...props}><span>Share</span></NavAction>
  )
}

export default NavActionShare
export { NavActionShare }
