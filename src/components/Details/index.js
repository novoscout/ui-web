import { h } from "preact"

import { View } from ".."


const Details = (props) => {
  return (
    <View
      elem="details"
      themeItem={props.themeItem ? props.themeItem : "details"}
      {...props}>{props.children}</View>
  )
}

export default Details
export { Details }
