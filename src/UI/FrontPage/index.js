import { h, render, Component } from "preact"
import Base from "../../components/Base"
import Page from "../../components/Page"
import cxs from 'cxs/component'


const FrontPage = (props) => {
  return (
    <_FrontPage className="front-page">
      <Page classname="page" />
    </_FrontPage>
  )
}

const _FrontPage = cxs(Base)(function(props) {
  return props.theme.frontPage
})


export default FrontPage
export { FrontPage }
