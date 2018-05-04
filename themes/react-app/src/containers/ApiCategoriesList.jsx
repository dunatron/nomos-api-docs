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
        ApiMethods {
          edges {
            node {
              ID
              Title
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
    return (nextProps.getApiCategoriesWithData.loading !== this.props.getApiCategoriesWithData.loading);
  }

  render() {
    const { getApiCategoriesWithData: { loading, readCategories } } = this.props;
    console.log('PROPS ', this.props)

    if (loading) {
      return <Loader loadingText={"fetching Nomos API docs"} size={20} fontSize={18} />;
    }

    const { edges } = readCategories

    return (
      <NavDrawer edges={edges}/>
    )
  }
}

const reduxWrapper = connect(
  state => ({
    tags: state.tags
  })
);

export default compose(
  withApollo,
  reduxWrapper,
  graphql(ALL_API_CATEGORIES_WITH_DATA, { name: 'getApiCategoriesWithData' }),
  // graphql(CategoriesQuery)
)(ApiCategoriesList);