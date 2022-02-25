import { h } from "preact"

import { View } from ".."


const Container = (props) => {
  return (
    <View
      themeItem={props.themeItem ? props.themeItem : "container"}
      {...props}>{props.children}</View>
  )
}

export default Container
export { Container }
