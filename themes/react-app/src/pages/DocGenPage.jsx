import React, { Component, Fragment } from "react"
import injectTapEventPlugin from "react-tap-event-plugin"
import "../components/MarkdownEditor/codemirrorOverride.css"
import "codemirror/lib/codemirror.css" // import codemirror styles
injectTapEventPlugin()

import PickPageType from "../components/PickPageType"
import DocGenerator from "../containers/DocGenerator"

const dpiDetectionStyle = {
  height: "1in",
  width: "1in",
  position: "fixed",
  left: "100%",
  top: "100%",
}

class DocGenPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasMounted: false,
    }
  }

  /**
   * Thought: when saving the state. save them as component type, ie: name. and its state as a Json Blob. Then when we call it we can reinstall as component name und unravil its data
   */

  componentDidMount() {
    this.setState({
      hasMounted: true,
    })
  }

  render() {
    const { hasMounted } = this.state
    return (
      <div>
        <div id="dpi" style={dpiDetectionStyle} />
        New and improved doc gen
        {hasMounted && (
          <Fragment>
            <PickPageType />
            <DocGenerator />
          </Fragment>
        )}
      </div>
    )
  }
}

export default DocGenPage
