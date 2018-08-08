import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withApollo, compose } from "react-apollo/index"
import MethodDetails from "../components/MethodDetails"

class MainContainer extends Component {
  render() {
    const {
      CurrentMethod: {
        Name,
        Description,
        HttpRequest,
        PermittedCall,
        QueryParams,
      },
    } = this.props

    return (
      <Fragment>
        <MethodDetails
          Name={Name}
          Description={Description}
          HttpRequest={HttpRequest}
          PermittedCall={PermittedCall}
          QueryParams={QueryParams}
        />
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
)(MainContainer)
