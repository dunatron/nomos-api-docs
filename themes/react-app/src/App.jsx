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

// pages
import AppPages from "./AppPages"

// components
import Loader from "./components/Loader"

// store actions
import { setTokenIsValid, setTokenIsNotValid } from "./actions/tokenActions"

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

class App extends Component {
  render() {
    const { classes } = this.props
    const {
      validateToken: { loading, validateToken },
      token,
      setTokenIsValid,
    } = this.props

    // if (this.props.validateToken.loading) {
    //   return (
    //     <Loader loadingText={"Checking for keys"} size={20} fontSize={18} />
    //   )
    // }

    // if (token && this.props.validateToken.validateToken.Valid) {
    //   setTokenIsValid()
    // }

    // if (token && this.props.validateToken.validateToken.Valid === false) {
    //   setTokenIsNotValid()
    // }
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
              <AppDrawer />
              {/* <main className={classes.content}>
                <Switch>
                  <Route exact path="/" component={MainContainer} />
                  <Route path="/create" component={CreateDocsContainer} />
                  <Route
                    path="/edit-snippet/:id"
                    component={EditSnippetContainer}
                  />
                </Switch>
              </main> */}
              <AppPages />
            </div>
          </div>
          );
        </div>
      </BrowserRouter>
    )
  }
}

// export default App;
// export default withStyles(styles)(App)

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
