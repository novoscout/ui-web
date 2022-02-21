import { h, Component } from "preact"
import { createRef, useContext } from "preact/compat"

import { Text, View } from "ui-shared/components"
import { Desk, Modal, Nav, Toolbar } from "../../components"

import { storage } from "../../helpers"

class Demo extends Component {
  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleFunc = this.toggleFunc.bind(this)
    this.detailLevelCallback = this.detailLevelCallback.bind(this)
    this.state = {
      loading: true,
      modal: { visible: false },
      modalRef: createRef()
    }
  }

  componentDidMount() {
    this.setState({
      loading: false,
      modalRef: createRef()
    })
  }

  toggleFunc(i) {
    if (i.target == this.state.modalRef.current.base) {
      this.setState({ modal: { visible: false } })
    }
  }

  async toggleModal(e) {
    if (e && e.hasOwnProperty("visible")) {
      await this.setState({ modal: { visible: e.visible } })
    } else {
      await this.setState({ modal: { visible: ! this.state.modal.visible } })
    }
    const opts = {
      capture: false,
      once: false,
      passive: false,
    }
    // Detect tap/click on modal outside menu to dismiss menu.
    if (this.state.modal.visible) {
      this.state.modalRef.current.base.addEventListener(
        "mouseup", this.toggleFunc, opts
      )
      this.state.modalRef.current.base.addEventListener(
        "pointerend", this.toggleFunc, opts
      )
      this.state.modalRef.current.base.addEventListener(
        "touchend", this.toggleFunc, opts
      )
    } else {
      this.state.modalRef.current.base.removeEventListener(
        "mouseup", this.toggleFunc
      )
      this.state.modalRef.current.base.removeEventListener(
        "pointerend", this.toggleFunc
      )
      this.state.modalRef.current.base.removeEventListener(
        "touchend", this.toggleFunc
      )
    }
  }

  async detailLevelCallback(value) {
    await this.setState({
      levelOfDetail: value
    })
    console.debug("dLC got this.navMenuRef:",this.navMenuRef)
    if (this.state.modal.visible && (this.navMenuRef || {}).base) {
      this.navMenuRef.base.style = {
        background: "none",
        border: "1px solid transparent",
        boxShadow: "none"
      }
    }
  }

  render() {
    if (this.state.loading) { return null }

    const commonActions = {
      toggleModal: this.toggleModal,
      chooseTheme: this.props.chooseTheme
    }

    return (
      <Modal.Context.Provider value={this.state.modal}>
        <Nav {...commonActions}
             detailLevelCallback={this.detailLevelCallback}
             ref={this.navRef}
             navMenuRef={this.navMenuRef}
             />
        <Desk {...commonActions} levelOfDetail={this.state.levelOfDetail} />
        <Toolbar {...commonActions} />
        <Modal {...commonActions}
               detailLevelCallback={this.detailLevelCallback}
               ref={this.modalRef}
               modalNavMenuRef={this.modalNavMenuRef}
               />
      </Modal.Context.Provider>
    )
  }
}

export default Demo
export { Demo }
