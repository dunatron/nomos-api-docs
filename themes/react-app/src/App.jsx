import React, { Component } from "react"
import "./App.css"
import { withStyles } from "material-ui/styles"
import classNames from "classnames"
import AppBar from "material-ui/AppBar"
import { gql, compose, graphql } from "react-apollo"
import { connect } from "react-redux"
import { withApollo } from "react-apollo/index"
// app drawer
import NavBar from "./components/NavBar"
import AppDrawer from "./components/AppDrawer"
// containers
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import { withRouter } from "react-router"
import ApiCategoriesList from "./containers/ApiCategoriesList"

// pages
import AppPages from "./AppPages"

// components
import Loader from "./components/Loader"

// store actions
import { setTokenIsValid, setTokenIsNotValid } from "./actions/tokenActions"

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

class App extends Component {
  render() {
    const { classes } = this.props
    const {
      validateToken: { loading, validateToken },
      token,
      setTokenIsValid,
    } = this.props

    if (loading) {
      return (
        <Loader loadingText={"Checking for keys"} size={20} fontSize={18} />
      )
    }

    if (token && validateToken.Valid) {
      setTokenIsValid()
    }

    if (token && validateToken.Valid === false) {
      setTokenIsNotValid()
    }

    return (
      <BrowserRouter>
        <div className="App">
          <div className={classes.root}>
            <div className={classes.appFrame}>
              <AppBar
                position="absolute"
                className={classNames(classes.appBar, classes[`appBar-left`])}>
                <NavBar />
              </AppBar>
              <AppDrawer children={[<ApiCategoriesList />]} />
              <AppPages />
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const reduxWrapper = connect(
  state => ({
    token: state.token.token,
    validToken: state.token.validToken,
  }),
  dispatch => ({
    setTokenIsValid: () => dispatch(setTokenIsValid()),
    setTokenIsNotValid: () => dispatch(setTokenIsNotValid()),
  })
)

export const VALIDATE_TOKEN = gql`
  query validateToken {
    validateToken {
      Valid
      Message
      Code
    }
  }
`

export default compose(
  withApollo,
  reduxWrapper,
  withStyles(styles),
  graphql(VALIDATE_TOKEN, { name: "validateToken" })
)(App)
