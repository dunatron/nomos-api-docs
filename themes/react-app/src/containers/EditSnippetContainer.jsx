import React, { Component, Fragment } from 'react';
import { gql, compose, graphql } from 'react-apollo';
import Loader from '../components/Loader';

import { connect } from "react-redux";
import { withApollo } from "react-apollo/index";
import { withRouter } from 'react-router'


class EditSnippetContainer extends Component {

  render() {

    console.log("Spinnept Container Props ", this.props)

    const {codeSample: {0:{CodeSample, ID, LanguageName}}} = this.props

    return (
      <Fragment>
        <h1>EDIT SNPIIET CONTAINER</h1>
        <p>{ID}</p>
        <p>{LanguageName}</p>
        <p>{CodeSample}</p>

        <div onClick={() => this._updateCodeSample()}>UPDATE BUTTON</div>
      </Fragment>
    )
  }


  _updateCodeSample = async () => {
    const { mutate } = this.props;
    const {codeSample: {0:{CodeSample, ID, LanguageName}}} = this.props
    console.log('Update Code Samples Props ', this.props)
    console.log('AHHH ', mutate)
    await this.props.updateCodeSnippet({
      variables: {
        ID:ID,
        NewMethodID: 2,
        NewLanguageName: "Test Search",
        NewCodeSample: CodeSample
      }

    })
      .then(response => {
        console.log('Update Response try catch', response)

      })

  }

}

const UPDATE_CODE_SAMPLE = gql`
mutation UpdateCodeSample(
  $ID: ID,
  $NewMethodID:ID,
  $NewLanguageName:String, 
  $NewCodeSample:String
) {
  updateCodeExample(
    ID:$ID,
    NewMethodID:$NewMethodID, 
    NewLanguageName:$NewLanguageName,
    NewCodeSample:$NewCodeSample
)
  {
    	ID
    	MethodID
   		CodeSample
    	LanguageName
  }
}
`;

const reduxWrapper = connect(
  (state, ownProps) => ({
    codeExamples: state.codeExamples.CodeExamples,
    codeSample: state.codeExamples.CodeExamples.filter(snippet => {
      // if(snipet.ID == ownProps.match.params.id){
      //   return snipet
      // }
      return snippet.ID === ownProps.match.params.id
    }),
    validToken: state.token.validToken
  }),
  dispatch => ({

  })
);

export default compose(
  withRouter,
  withApollo,
  reduxWrapper,
  graphql(UPDATE_CODE_SAMPLE, { name: 'updateCodeSnippet' }),
  // graphql(CategoriesQuery)
)(EditSnippetContainer);