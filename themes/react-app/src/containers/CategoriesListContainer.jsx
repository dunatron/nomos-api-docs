import React, { Component, Fragment } from "react"
import { gql, compose, graphql } from "react-apollo"
import Loader from "../components/Loader"
import { withApollo } from "react-apollo/index"
import { withRouter } from "react-router"
import MethodLinkCard from "../components/MethodLinkCard"

// Components
import CategoryHolder from "../components/CagetogryHolder"

// export const ALL_API_CATEGORIES_WITH_DATA = gql`
//   query getApiData {
//     readCategories {
//       edges {
//         node {
//           ID
//           Name
//           ...MethodsOverview
//         }
//       }
//     }
//   }
//   ${MethodLinkCard.fragments.details}
// `
// export const ALL_API_CATEGORIES_WITH_DATA = gql`
//   query getApiData {
//     readCategories {
//       edges {
//         node {
//           ID
//           Name
//         }
//       }
//     }
//   }
// `

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
                ...MethodOverview
              }
            }
          }
        }
      }
    }
  }
  ${MethodLinkCard.fragments.method}
`

class CategoriesListContainer extends Component {
  render() {
    const {
      getApiCategoriesWithData: { loading, readCategories },
    } = this.props

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
        {edges &&
          edges.map((category, i) => {
            const { ID, Name, __typename, Methods } = category.node
            console.log("category -> ", category)
            return (
              <Fragment>
                <CategoryHolder
                  key={i}
                  name={Name}
                  children={Methods.edges.map((methodEdge, idx) => {
                    return <MethodLinkCard method={methodEdge.node} key={idx} />
                  })}
                />
              </Fragment>
            )
          })}
      </Fragment>
    )
  }
}
//options: props => ({ variables: { ID: props.methodID || null } }),

export default compose(
  withRouter,
  withApollo,
  graphql(ALL_API_CATEGORIES_WITH_DATA, { name: "getApiCategoriesWithData" })
)(CategoriesListContainer)
