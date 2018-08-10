import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withApollo, compose } from "react-apollo"
import KeyHandler, { KEYPRESS } from "react-key-handler"

class DocGenerator extends Component {
  state = {}

  constructor(props) {
    super(props)

    this.state = {
      started: false,
      screenDPI: 96,
    }
  }

  startDocument = v => {
    // this.state({
    //   started: true,
    // })
    console.log("pressed props", v)
    console.log("Key val pressed ", v.key)
    this.setState({
      started: true,
    })
  }

  renderPage = screenDPI => {
    switch (screenDPI) {
      case 72:
        return
      case 96:
        return {
          width: 794,
          height: 1123,
        }
      case 150:
        return
      case 300:
        return
      case 600:
        return
      case 720:
        return
      case 1200:
        return
      case 1440:
        return
      case 2400:
        return
      case 2880:
        return

      default:
        return
    }
  }

  renderDocumentGenerator = () => {
    const { screenDPI } = this.state
    const pageDimensions = this.renderPage(screenDPI)
    console.log("pageDimensions", pageDimensions)
    return (
      <div
        style={{
          border: "1px solid purple",
          height: `${pageDimensions.height}px`,
          width: `${pageDimensions.width}px`,
        }}>
        Hi
      </div>
    )
  }

  /**
   * Key Press Docs: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
   */
  render() {
    const { started, keyPressConf } = this.state
    return (
      <Fragment>
        <div>The doc gen container. Press "enter" to start</div>
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="Enter"
          onKeyHandle={v => this.startDocument(v)}
        />
        {started && this.renderDocumentGenerator()}
      </Fragment>
    )
  }
}

const reduxWrapper = connect(state => ({
  CurrentMethod: state.codeExamples,
}))

export default compose(
  withApollo,
  reduxWrapper
)(DocGenerator)
