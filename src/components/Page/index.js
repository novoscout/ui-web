import { h } from "preact"
import View from "../View"
import cxs from 'cxs/component'

// import quicklink from "quicklink/dist/quicklink.mjs"
// quicklink()

const Page = (props) => {
  return (
    <_Page className={props.className}>{props.children}</_Page>
  )
}

const _Page = cxs(View)(function(props) {
  return props.theme.page
})

export default Page
export { Page }
