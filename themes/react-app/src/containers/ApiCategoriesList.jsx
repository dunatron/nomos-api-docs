import React, { Component } from 'react';
import { gql, compose, graphql } from 'react-apollo';
import Loader from '../components/Loader';

import { connect } from "react-redux";
import { withApollo } from "react-apollo/index";

// Components
import NavDrawer from '../components/NavDrawer'

// const ALL_TAGS_QUERY = gql`
// query getCategories {
//   readHappTags {
//     ID
//     Title
//     SecondaryTags {
//       Title
//       Checked
//       HappTagID
//     }
//   }
// }
// `;

const ALL_API_CATEGORIES_WITH_DATA = gql`
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


class ApiCategoriesList extends Component {

  // fetchTags = async () => {
  //   // 1. Place Component into loading mode
  //   this.props.dispatch(startFetchTags());
  //   // 2. Start Fetching the tags
  //   this.props.client.query({
  //     query: ALL_TAGS_QUERY,
  //   })
  //   // 3. tags have been fetched, do something with them
  //     .then((res) => {
  //       this.props.dispatch(fetchTags(res.data.readHappTags));
  //     })
  // };

  componentWillMount() {
    // this.fetchTags().then(() => {

    // })
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.getApiCategoriesWithData.loading !== this.props.getApiCategoriesWithData.loading){
      return true
    }
    if(nextProps.codeExamples !== this.props.codeExamples){
      return true
    }
    return false
  }

  render() {
    const { getApiCategoriesWithData: { loading, readCategories }, codeExamples } = this.props;
    console.log('PROPS ', this.props)

    if (loading) {
      return <Loader loadingText={"fetching Nomos API docs"} size={20} fontSize={18} />;
    }

    const { edges } = readCategories

    return (
      <NavDrawer edges={edges} codeExamples={codeExamples}/>
    )
  }
}

const reduxWrapper = connect(
  state => ({
    codeExamples: state.codeExamples.codeExamples
  })
);

export default compose(
  withApollo,
  reduxWrapper,
  graphql(ALL_API_CATEGORIES_WITH_DATA, { name: 'getApiCategoriesWithData' }),
  // graphql(CategoriesQuery)
)(ApiCategoriesList);