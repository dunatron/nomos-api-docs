import React, { Component, Fragment } from "react"

//layout
import SinglePanel from "../layouts/SinglePanel"

//containers
import CategoriesListContainer from "../containers/CategoriesListContainer"

class MethodListPage extends Component {
  render() {
    return (
      <Fragment>
        <SinglePanel children={[<CategoriesListContainer />]} />
      </Fragment>
    )
  }
}

export default MethodListPage
