import { h } from "preact"

import { View } from ".."


const TextInput = (props) => {
  // Ignore some unnecessary items in new props.
  const { href, onClick, ...newProps } = props

  return (
    <View
      elem="input"
      type="text"
      themeItem="input"
      {...newProps}>{props.children}</View>
  )
}

export default TextInput
export { TextInput }
