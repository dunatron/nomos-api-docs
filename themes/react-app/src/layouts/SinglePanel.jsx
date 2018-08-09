import React, { Component, Fragment } from "react"
import { withApollo, compose } from "react-apollo/index"
import { withStyles } from "material-ui/styles"
import Paper from "material-ui/Paper"

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
    const { children, classes } = this.props

    return (
      <Fragment>
        {children && (
          <Paper className={classes.root}>
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
  withApollo,
  withStyles(styles)
)(SinglePanel)
