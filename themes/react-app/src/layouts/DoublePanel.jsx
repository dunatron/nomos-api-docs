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
    minWidth: "50%",
    backgroundColor: theme.palette.background.paper,
    height: `calc(100vh - ${theme.spacing.unit * 6}px)`,
    // padding: theme.spacing.unit * 4,
    padding: 0,
    boxSizing: "border-box",
    // marginTop: theme.spacing.unit * 6,
    // height: '100vh',
    textAlign: "left",
  },
})

class DoublePanel extends Component {
  render() {
    const { leftSection, rightSection, classes, history } = this.props
    const { pathname } = history.location

    console.log("DoublePanel Props ", this.props)

    return (
      <Fragment>
        {leftSection && (
          <Paper className={classes.root}>
            {pathname && pathname !== "/" && <BackButton />}
            {leftSection.map((component, idx) => {
              return component
            })}
          </Paper>
        )}
        {rightSection && (
          <Paper className={classes.root}>
            {rightSection.map((component, idx) => {
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
)(DoublePanel)
