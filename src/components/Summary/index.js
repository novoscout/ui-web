import { h } from "preact"

import { View } from ".."


const Summary = (props) => {
  return (
    <View
      elem="summary"
      themeItem="summary"
      {...props}>
      <View elem="span" themeItem="textLink">{props.children}</View>
    </View>
  )
}

export default Summary
export { Summary }
