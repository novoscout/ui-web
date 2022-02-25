import { h } from "preact"

import { NavAction } from "../NavAction"


const handleCancel = (props) => {
  if (props.toggleModal) {
    props.toggleModal({visible:false})
  }
}

const NavActionCancel = (props) => {
  return (
    <NavAction
      href={null}
      onClick={ () => { handleCancel(props) } }>
      <NavAction.Icon
        ariaLabel="Cancel"
        role="none"><b style={{color:"red",fontSize:"1.4em"}}>&times;</b></NavAction.Icon>
      <NavAction.Text>&nbsp;Cancel</NavAction.Text>
    </NavAction>
  )
}

export default NavActionCancel
export { NavActionCancel }
