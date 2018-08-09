import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Paper from "material-ui/Paper/Paper"
import Typography from "material-ui/Typography/Typography"

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})

const CategoryHolder = props => {
  const { classes, name, children } = props

  console.log("The holder has children to render ", children)

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          {name}
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your
          application.
        </Typography>
        {children && children.map(childComponent => childComponent)}
      </Paper>
    </div>
  )
}

CategoryHolder.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CategoryHolder)
