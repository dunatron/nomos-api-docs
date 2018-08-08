import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withApollo, compose } from "react-apollo/index"
import MethodDetails from "../components/MethodDetails"
import AddMethodNote from "../components/AddMethodNote"

class CurrentMethodContainer extends Component {
  render() {
    const {
      CurrentMethod: {
        ID,
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
        <AddMethodNote methodID={ID} />
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
)(CurrentMethodContainer)
