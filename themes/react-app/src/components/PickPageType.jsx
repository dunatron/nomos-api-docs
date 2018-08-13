import React, { Component } from "react"
import { connect } from "react-redux"
import { withStyles } from "material-ui/styles"
import { compose } from "react-apollo"
import Button from "material-ui/Button"
import { withRouter } from "react-router"
import { setDPI } from "../actions/docGenActions"
import { setCurrentMethod } from "../actions/codeExamplesActions"
import { toggleAppDrawer } from "../actions/appSettings"

const styles = theme => ({
  button: {
    borderRadius: 0,
  },
})

class PickPageType extends Component {
  constructor(props) {
    super(props)

    this.state = {
      started: false,
      screenDPI: 96,
    }
  }

  /**
   * This is a really important component atm(well at least how I plan to build it for MVP)
   * NOTE: when refactor move a lot of this initial setup to the container.
   * 1. on Mount our first job is to find the screenDPI and set it in the store
   * 2. when we pick a page size, you should use the current dpi and do a function that is a mass switch based on the DPI and page type.
   * this will find page with and height.
   * 3. then we can set page dimensions {
    sizeName: "A4",
    screenDPI: 96,
    pageWidth: 794,
    pageHeight: 1123,
  }
   */
  componentWillMount() {
    // Below method should have div with id do get info from
    this.getDPI()
  }

  setScreenDPI = () => {
    const currentScreenDPI = this.state.screenDPI
    console.log("PickPageType Set DPI ", currentScreenDPI)
    const testMethod = {
      ID: 3,
      Name: "test Name",
      Description: "test desc",
      HttpRequest: "Test",
      PermittedCall: "test",
    }
    setCurrentMethod(testMethod)
    this.props.setDPI(currentScreenDPI)
    this.props.toggleAppDrawer()
  }

  getDPI = () => {
    var dpi_x = document.getElementById("dpi").offsetWidth
    var dpi_y = document.getElementById("dpi").offsetHeight
    // var width = screen.width / dpi_x
    // var height = screen.height / dpi_y
    console.group("Damn, Daniel. FBI keep bringing them all white vans through")
    console.log("dpi_x", dpi_x)
    console.log("dpi_y", dpi_y)
    // console.log("width", width)
    // console.log("height", height)
    console.groupEnd()
    this.setState({
      ...this.state,
      screenDPI: dpi_x,
    })
  }

  render() {
    const { classes, appDrawerIsOpen } = this.props

    console.log("umm appDrawerIsOpen? ", appDrawerIsOpen)
    return (
      <div>
        <div>is open? {appDrawerIsOpen ? "Tis open " : "closed "}</div>

        <Button
          className={classes.button}
          variant="raised"
          color="primary"
          type="submit"
          onClick={() => this.setScreenDPI()}>
          SET PAGE DPI
        </Button>
      </div>
    )
  }

  handleBackButton = () => {
    this.props.history.goBack()
  }
}

const reduxWrapper = connect(
  (state, ownProps) => ({
    docGenAttributes: state.docGen.pageAttributes,
    appDrawerIsOpen: state.appSettings.appDrawerIsOpen,
  }),
  dispatch => ({
    setDPI: dpi => dispatch(setDPI(dpi)),
    setCurrentMethod: method => dispatch(setCurrentMethod(method)),
    toggleAppDrawer: () => dispatch(toggleAppDrawer()),
  })
)

export default compose(
  withRouter,
  reduxWrapper,
  withStyles(styles)
)(PickPageType)
