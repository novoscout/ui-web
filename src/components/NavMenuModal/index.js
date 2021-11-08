import { h } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { TextLink } from "ui-shared/components"

import { NavMenu } from ".."
import { Theme } from "../../theme"


const NavMenuModal = (props) => {
  const theme = useContext(Theme)
  const className = theme.navMenuModal ? String(cxs({...theme.navMenuModal})) : null
  return (
    <div className={className} {...props}>
      <NavMenu.Inner />
    </div>
  )
}

export default NavMenuModal
export { NavMenuModal }
