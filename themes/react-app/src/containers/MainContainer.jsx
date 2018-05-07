import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withApollo, compose } from "react-apollo/index";
import MainLeft from '../components/MainLeft';
import MainRight from '../components/MainRight';

class MainContainer extends Component {

  render() {
    const { CurrentMethod: { ID, Name, Description, HttpRequest, PermittedCall, CodeExamples, QueryParams } } = this.props;

    return (
      <Fragment>
        <MainLeft
          Name={Name}
          Description={Description}
          HttpRequest={HttpRequest}
          PermittedCall={PermittedCall}
          QueryParams={QueryParams} />
        <MainRight CodeExamples={CodeExamples} />
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
)(MainContainer);