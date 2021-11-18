import { h } from "preact"
import { Router } from "preact-router"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { View } from "ui-shared/components"
import { Ident } from ".."

import { Theme } from "../../theme"


// import quicklink from "quicklink/dist/quicklink.mjs"
// quicklink()

const Desk = (props) => {
  const theme = useContext(Theme)
  const className = theme.desk ? String(cxs({...theme.desk})) : null
  return (
    <Router>
      <View
        default
        id="desk"
        className={className}
        {...props}>
        {props.children}
      </View>
      <Ident path="/id" />
    </Router>
  )
}

export default Desk
export { Desk }
