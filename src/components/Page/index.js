import { h, Component } from "preact"
import { useContext } from "preact/compat"
import { mergeDeep } from "../../helpers/mergeDeep"
import { Theme } from "../../theme"
import View from "../View"
import cxs from "cxs"

// import quicklink from "quicklink/dist/quicklink.mjs"
// quicklink()

const Page = (props) => {
  const theme = useContext(Theme)
  const className = String(theme.page ? cxs({...theme.page}) : "") + " fullpage"
  return (
    <View className={className} {...props}>{props.children}</View>
  )
}

export default Page
export { Page }
