import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withApollo, compose } from "react-apollo/index"
import KeyPressComponent from "../components/KeyPressComponent"
import KeyHandler, { KEYPRESS } from "react-key-handler"

class DocGenerator extends Component {
  state = {}

  constructor(props) {
    super(props)

    this.state = {
      started: false,
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
        {started && "WE have started the doc generator "}
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
