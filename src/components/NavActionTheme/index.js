import { h } from "preact"

import { NavAction } from "../NavAction"


const handleChooseTheme = (props) => {
  if (props.chooseTheme) {
    props.chooseTheme()
  }
  if (props.toggleModal) {
    props.toggleModal({visible:false})
  }
}

const NavActionTheme = (props) => {
  return (
    <NavAction
      href={null}
      onClick={ () => { handleChooseTheme(props) } }>
      <NavAction.Icon ariaLabel="Choose day/night theme">🌗</NavAction.Icon>
      <NavAction.Text>&nbsp;Day/night</NavAction.Text>
    </NavAction>
  )
}

export default NavActionTheme
export { NavActionTheme }
