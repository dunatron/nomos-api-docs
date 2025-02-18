import React from "react"
import { withStyles } from "material-ui/styles"
import { MenuItem } from "material-ui/Menu"
import { FormControl } from "material-ui/Form"
import { InputLabel } from "material-ui/Input"
import Select from "material-ui/Select"

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    textAlign: "left",
    width: "100%",
    boxSizing: "border-box",
  },
  formContainer: {
    padding: `${theme.spacing.unit * 4}px 0`,
    height: theme.spacing.unit * 6,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  formControl: {
    minWidth: "180px",
  },
  button: {
    borderRadius: 0,
  },
  codeEditor: {
    display: "flex",
    //width: `calc(100% - 241px)`,
    height: `calc(100vh - ${theme.spacing.unit * 28 + 4}px )`,
    margin: `0 -${theme.spacing.unit * 4}px`,
  },
  editorField: {
    //flex: '1 1 0'
    overflowX: "auto",
    flexBasis: 0,
    flexGrow: 1,
  },
})

const SelectOption = ({
  classes,
  value,
  options,
  label,
  selectID,
  handleChange,
}) => {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={selectID}>{label}</InputLabel>
      <Select
        value={value}
        // onChange={this.handleChange("MethodID")}
        onChange={e => handleChange(e.target.value)}
        inputProps={{
          name: selectID,
          id: selectID,
        }}>
        {options.map((d, i) => {
          return (
            <MenuItem key={i} value={d.value}>
              {d.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default withStyles(styles)(SelectOption)
