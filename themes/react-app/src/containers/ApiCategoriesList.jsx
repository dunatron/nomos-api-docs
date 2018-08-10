import React, { Component, Fragment } from "react"
import { gql, compose, graphql } from "react-apollo"
import Loader from "../components/Loader"
import { withApollo } from "react-apollo/index"
import { withRouter } from "react-router"

// components
import CategoryItem from "../components/CategoryItem"

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

class ApiCategoriesList extends Component {
  render() {
    const {
      getApiCategoriesWithData: { loading, readCategories },
    } = this.props

    console.log("loading ", loading)
    console.log(
      "getApiCategoriesWithData ",
      this.props.getApiCategoriesWithData
    )
    console.log("readCategories ", readCategories)

    if (loading) {
      return (
        <Loader
          loadingText={"fetching Nomos API docs"}
          size={20}
          fontSize={18}
        />
      )
    }

    const { edges } = readCategories

    return (
      <Fragment>
        {edges && edges.map((d, i) => <CategoryItem listValue={d} key={i} />)}
      </Fragment>
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  graphql(ALL_API_CATEGORIES_WITH_DATA, { name: "getApiCategoriesWithData" })
)(ApiCategoriesList)
