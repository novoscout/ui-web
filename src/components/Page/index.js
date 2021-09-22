import { h } from 'preact'
import Base from "../Base"
import cxs from 'cxs/component'

// import quicklink from "quicklink/dist/quicklink.mjs"
// quicklink()

const _Page = cxs(Base)(function(props) {
  return props.theme.page
})

function Page(props) {
  return (
    <_Page className={props.className}>{props.children}</_Page>
  )
}

export default Page
export { Page }
