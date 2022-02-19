import { h, Component } from "preact"
import { createRef, useContext } from "preact/compat"

import { Text, View } from "ui-shared/components"
import { Desk, Modal, Nav, Toolbar } from "../../components"


class Demo extends Component {
  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleFunc = this.toggleFunc.bind(this)
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
      this.setState({modal:{visible:false}})
    }
  }

  async toggleModal(e) {
    if (e && e.hasOwnProperty("visible")) {
      await this.setState({ modal: { visible: e.visible }})
    } else {
      await this.setState({ modal: { visible: ! this.state.modal.visible }})
    }
    if (this.state.modal.visible) {
      this.state.modalRef.current.base.addEventListener(
        "touchend",
        this.toggleFunc,
        {
          capture: false,
          once: false,
          passive: false,
        }
      )
    } else {
      this.state.modalRef.current.base.removeEventListener(
        "touchend",
        this.toggleFunc
      )
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
        <Nav {...commonActions} />
        <Desk {...commonActions} />
        <Toolbar {...commonActions} />
        <Modal {...commonActions} ref={this.state.modalRef} />
      </Modal.Context.Provider>
    )
  }
}

export default Demo
export { Demo }
