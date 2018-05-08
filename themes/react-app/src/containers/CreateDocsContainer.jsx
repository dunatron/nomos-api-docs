import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withApollo, compose } from "react-apollo/index";

class CreateDocsContainer extends Component {

  render() {


    return (
      <Fragment>
        <h1>New Entry Point for creating API DOCS</h1>
      </Fragment>
    )
  }
}

const reduxWrapper = connect(
  state => ({
    CurrentMethod: state.codeExamples
  })
);

export default compose(
  withApollo,
  reduxWrapper,
)(CreateDocsContainer);