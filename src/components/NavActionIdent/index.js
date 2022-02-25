import { h } from "preact"

import { Ident, NavAction } from ".."


const handleIdent = (props) => {
  if (props.handleIdent) {
    props.handleIdent()
  }
  if (props.toggleModal) {
    props.toggleModal({visible:false})
  }
}

const NavActionIdent = (props) => {
  return (
    <NavAction
      href={Ident.href}
      onClick={ () => { handleIdent(props) } }>
      <NavAction.Icon ariaLabel="Login/out">🔒</NavAction.Icon>
      <NavAction.Text>&nbsp;Login/out</NavAction.Text>
    </NavAction>
  )
}

export default NavActionIdent
export { NavActionIdent }
