import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import TextField from "material-ui/TextField"

const styles = theme => ({
  searchField: {
    margin: theme.spacing.unit * 2,
  },
})

const SearchFilter = ({ classes, value, handleChange }) => {
  return (
    <TextField
      id="SearchFilter"
      label="Search Filter"
      className={classes.searchField}
      value={value}
      onChange={e => handleChange(e.target.value)}
      margin="normal"
    />
  )
}

export default withStyles(styles)(SearchFilter)
