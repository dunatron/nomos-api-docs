import React, { Component, Fragment } from "react"
import { graphql, gql, compose, withApollo } from "react-apollo"
import { withStyles } from "material-ui/styles"
import { connect } from "react-redux"
import Button from "material-ui/Button"
import BackButton from "./BackButton"
import TextField from "material-ui/TextField"
import Input, { InputLabel } from "material-ui/Input"
import { MenuItem } from "material-ui/Menu"
import { FormControl, FormHelperText } from "material-ui/Form"
import Select from "material-ui/Select"
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import { withRouter } from "react-router"
import { ALL_API_CATEGORIES_WITH_DATA } from "../containers/ApiCategoriesList"
import Loader from "./Loader"
import SyntaxHighlighter from "react-syntax-highlighter"
import classNames from "classnames"
import CodeSample from "./CodeSample"
import { GET_SINGLE_API_METHOD } from "../components/ApiMenuItem"

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

class SelectApiMethod extends Component {
  state = {
    MethodID: "",
  }

  render() {
    console.log("Spinnept Container Props ", this.props)
    const { updating, updatingText } = this.state

    const { classes, methods, client, value } = this.props

    const data = client.readQuery({
      query: ALL_API_CATEGORIES_WITH_DATA,
    })

    console.log("Extract methods from this data", data)

    const methodsList = []

    data.readCategories.edges.map((cat, catIdx) => {
      cat.node.Methods.edges.map((method, methodIdx) => {
        methodsList.push({
          name: method.node.Name,
          id: method.node.ID,
        })
      })
    })

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="method">Method</InputLabel>
        <Select
          value={value}
          // onChange={this.handleChange("MethodID")}
          onChange={this.handleMethodChange("MethodID")}
          inputProps={{
            name: "MethodID",
            id: "MethodID",
          }}>
          {methodsList.map((d, i) => {
            return (
              <MenuItem key={i} value={d.id}>
                {d.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    )
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleMethodChange = name => event => {
    this.props.methodIDChange(event.target.value)
    // this.setState({
    //   [name]: event.target.value,
    // })
  }
}

export default compose(
  withRouter,
  withApollo,
  withStyles(styles)
  // graphql(CategoriesQuery)
)(SelectApiMethod)
