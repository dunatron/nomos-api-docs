import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
import { withStyles } from "material-ui/styles"
import Paper from "material-ui/Paper"
import BackButton from "../components/BackButton"

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: "auto",
    flexBasis: 0,
    minWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing.unit * 4,
    padding: 0,
    boxSizing: "border-box",
    // marginTop: theme.spacing.unit * 6,
    // height: '100vh',
    textAlign: "left",
  },
})

class SinglePanel extends Component {
  render() {
    const { children, classes, history } = this.props
    const { pathname } = history.location

    console.log("Single Panel Props")

    console.log("SinglePanel Props ", this.props)

    return (
      <Fragment>
        {children && (
          <Paper className={classes.root}>
            {pathname && pathname !== "/" && <BackButton />}
            {children.map((component, idx) => {
              return component
            })}
          </Paper>
        )}
      </Fragment>
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  withStyles(styles)
)(SinglePanel)
