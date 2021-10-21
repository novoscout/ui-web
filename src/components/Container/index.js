import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { View } from "ui-shared/components"

import { Theme } from "../../theme"


const Container = (props) => {
  const theme = useContext(Theme)
  const className = theme.container ? String(cxs({...theme.container})) : null
  return (
    <View
      className={className} {...props}>
      {props.children}
    </View>
  )
}

export default Container
export { Container }
