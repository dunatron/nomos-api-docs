import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withApollo, compose } from "react-apollo/index"
import KeyPressComponent from "../components/KeyPressComponent"
import KeyHandler, { KEYPRESS } from "react-key-handler"

class DocGenerator extends Component {
  state = {}

  constructor(props) {
    super(props)
    const keyPressConf = [{ keyVal: "Enter", funcCall: this.startDocument() }]
    this.state = {
      started: false,
      keyPressConf: keyPressConf,
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
        {/* <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="Enter"
          onKeyHandle={v => this.startDocument(v)}
        /> */}
        {keyPressConf.map(keyType => {
          return (
            <KeyHandler
              keyEventName={KEYPRESS}
              keyValue={keyType.keyVal}
              onKeyHandle={v => this[keyType.funcCall]}
            />
          )
        })}
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
