import React, { Component, Fragment } from "react"
import "./App.css"
import { withStyles } from "material-ui/styles"
import { compose } from "react-apollo"
import { withApollo } from "react-apollo/index"
// containers
import MainContainer from "./containers/MainContainer"
import CreateDocsContainer from "./containers/CreateDocsContainer"
import EditSnippetContainer from "./containers/EditSnippetContainer"
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import { withRouter } from "react-router"

// Pages
import HomePage from "./pages/HomePage"

const styles = {
  cardHolder: {
    display: "flex",
    "align-items": "center",
    overflow: "auto",
    "box-sizing": "border-box",
    width: "100%",
    "justify-content": "center",
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "flex-flow": "row wrap",
    "align-content": "flex-end",
  },
}

class AppPages extends Component {
  render() {
    const { classes } = this.props
    return (
      <main className={classes.content}>
        <Switch>
          {/* <Route exact path="/" component={MainContainer} /> */}
          <Route exact path="/" component={HomePage} />
          <Route path="/create" component={CreateDocsContainer} />
          <Route path="/edit-snippet/:id" component={EditSnippetContainer} />
        </Switch>
      </main>
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  withStyles(styles)
)(AppPages)
