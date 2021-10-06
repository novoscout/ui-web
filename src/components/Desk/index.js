import { h, Component } from "preact"
import { useContext } from "preact/compat"
import { Theme } from "../../theme"
import { View } from "ui-shared/components"

import cxs from "cxs"

// import quicklink from "quicklink/dist/quicklink.mjs"
// quicklink()

const Desk = (props) => {
  const theme = useContext(Theme)
  const className = theme.desk ? String(cxs({...theme.desk})) : ""
  return (
    <View className={className} {...props}>{props.children}</View>
  )
}

export default Desk
export { Desk }
