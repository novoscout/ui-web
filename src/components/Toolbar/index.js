import { h } from "preact"

import { FAB, View } from ".."


const Toolbar = (props) => {
  return (
    <View id="toolbar" themeItem="toolbar" {...props}>
      <FAB onClick={props.toggleModal} />
    </View>
  )
}

export default Toolbar
export { Toolbar }
