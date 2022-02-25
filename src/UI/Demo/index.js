import { h, Component, createContext } from "preact"
import { useContext } from "preact/compat"

import { Text, View } from "ui-shared/components"

import { Desk, Loading, Modal, Nav, Toolbar } from "../../components"
import { storage } from "../../helpers"
import api from "../../API"



class Demo extends Component {
  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.detailLevelCallback = this.detailLevelCallback.bind(this)
    this.state = {
      loading: true,
      modal: { visible: false },
      levelOfDetail: 3
    }
  }

  componentDidMount() {
    const lod = parseInt(storage.getItem("levelOfDetail"))
    if (lod != NaN) {
      this.detailLevelCallback(lod)
    }
    this.setState((prevState) => {
      return {
        loading:false,
        levelOfDetail: lod == NaN
                     ? prevState.levelOfDetail
                     : lod
      }
    })
  }

  toggleModal(e) {
    this.setState((prevState) => {
      return {
        modal: {
          visible: ! prevState.modal.visible
        }
      }
    })
  }

  detailLevelCallback(value) {
    value = parseInt(value)
    for (let i = 0; i <= value; i++) {
      document.body.classList.remove("lod-" + i + "-shrink")
    }
    for (let i = 4; i > value; i--) {
      document.body.classList.add("lod-" + i + "-shrink")
    }
    this.setState({levelOfDetail:value})
  }

  render() {
    if (this.state.loading) { return <Loading /> }

    const commonActions = {
      chooseTheme: this.props.chooseTheme,
      toggleModal: this.toggleModal
    }

    // For some bizarre reason, the Modal.Context below
    // only picks up changes to the state if the
    // individual var is selected, rather than passing
    // the state itself in here. This "bug" (?) only
    // seems to happen on mobile, not desktop, Firefox.
    const modalVisibility = this.state.modal.visible

    return (
      <Modal.Context.Provider value={{visible:modalVisibility}}>
        <Nav
          {...commonActions}
          detailLevelCallback={this.detailLevelCallback}
        />
        <Desk
          {...commonActions}
          levelOfDetail={this.state.levelOfDetail}
          monitorForChange={this.props.monitorForChange || []}
        />
        <Toolbar
          {...commonActions}
        />
        <Modal
          {...commonActions}
          detailLevelCallback={this.detailLevelCallback}
        />
      </Modal.Context.Provider>
    )
  }
}

export default Demo
export { Demo }
