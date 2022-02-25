import { h } from "preact"

import { NavAction } from "../NavAction"

const handlePrint = (props) => {
  setTimeout( () => { self.print() }, 500)
  if (props.toggleModal) {
    props.toggleModal({visible:false})
  }
}

const NavActionPrint = (props) => {
  return (
    <NavAction
      href={null}
      onClick={ () => { handlePrint(props) } }>
      <NavAction.Icon
        ariaLabel="Print"
        role="none">🖨️</NavAction.Icon>
      <NavAction.Text>&nbsp;Print</NavAction.Text>
    </NavAction>
  )
}

export default NavActionPrint
export { NavActionPrint }
