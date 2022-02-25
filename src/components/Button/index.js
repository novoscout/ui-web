import { h } from "preact"

import { View } from ".."


const Button = (props) => {
  return (
    <View
      elem="button"
      themeItem={props.themeItem ? props.themeItem : "button"}
      {...props}>{props.children}</View>
  )
}

export default Button
export { Button }
