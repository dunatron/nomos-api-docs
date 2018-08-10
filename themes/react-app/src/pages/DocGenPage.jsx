import React, { Component, Fragment } from "react"

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

