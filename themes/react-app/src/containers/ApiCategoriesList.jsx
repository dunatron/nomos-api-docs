import React, { Component } from 'react';
import { gql, compose, graphql } from 'react-apollo';
import Loader from '../components/Loader';

import { connect } from "react-redux";
import { withApollo } from "react-apollo/index";
import { setTokenIsValid } from '../actions/tokenActions'
import { withRouter } from 'react-router'

// Components
import NavDrawer from '../components/NavDrawer'

export const ALL_API_CATEGORIES_WITH_DATA = gql`
query getApiData {
  readCategories {
    edges {
      node {
        ID
        Name
        Methods {
          edges {
            node {
              ID
              Name
            }
          }
        }
      }
    }
  }
}
`

export const VALIDATE_TOKEN = gql`
query validateToken {
  validateToken {
    Valid
    Message
    Code
  }
}
`;


class ApiCategoriesList extends Component {
  
  render() {
    const { getApiCategoriesWithData: { loading, readCategories }, token, codeExamples, validToken, setTokenIsValid } = this.props;
    console.log('PROPS ', this.props)

    if (loading) {
      return <Loader loadingText={"fetching Nomos API docs"} size={20} fontSize={18} />;
    }

    if (this.props.validateToken.loading) {
      return <Loader loadingText={"Checking for keys"} size={20} fontSize={18} />;
    }

    if (token && this.props.validateToken.validateToken.Valid) {
      setTokenIsValid()
    }

    console.log("Reading Categories for APP DATA ", readCategories)

    const { edges } = readCategories

    return (
      <NavDrawer edges={edges} codeExamples={codeExamples} validToken={validToken} />
    )
  }
}

const reduxWrapper = connect(
  state => ({
    codeExamples: state.codeExamples.codeExamples,
    token: state.token.token,
    validToken: state.token.validToken
  }),
  dispatch => ({
    setTokenIsValid: () => dispatch(setTokenIsValid()),
  })
);

export default compose(
  withRouter,
  withApollo,
  reduxWrapper,
  graphql(ALL_API_CATEGORIES_WITH_DATA, { name: 'getApiCategoriesWithData' }),
  graphql(VALIDATE_TOKEN, { name: 'validateToken' })
  // graphql(CategoriesQuery)
)(ApiCategoriesList);