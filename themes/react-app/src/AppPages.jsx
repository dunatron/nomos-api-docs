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

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  "appBar-left": {
    marginLeft: drawerWidth,
  },
  "appBar-right": {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
  },
  toolbar: {},
  content: {
    width: `calc(100% - ${drawerWidth}px)`,
    display: "flex",
    overflow: "auto",
    height: `calc(100vh - ${theme.spacing.unit * 6}px)`,
    marginTop: theme.spacing.unit * 6,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
  },
})

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
