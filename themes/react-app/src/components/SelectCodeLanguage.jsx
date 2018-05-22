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
import { GET_SINGLE_API_METHOD } from "./ApiMenuItem"
import { FETCH_LANGUAGES } from "../queries/fetchLanguages"

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

class SelectCodeLanguage extends Component {

  state = {
    LanguageName: "",
  }

  render() {
    const { classes,
      fetchLanguages: { readLanguages, loading },
      value
    } = this.props


    if(loading) {
      return <Loader loadingText={"fetching language"} font={18} fontSize={22} />
    }

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="category">Language</InputLabel>
        <Select
          value={value}
          onChange={this.handleLanguageChange("LanguageName")}
          inputProps={{
            name: "LanguageName",
            id: "LanguageName",
          }}>
          {readLanguages.map((d, i) => {
            return (
              <MenuItem key={i} value={d.Name}>
                {d.Name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    )
  }

  handleLanguageChange = name => event => {
    this.props.languageChange(event.target.value)
  }

}

export default compose(
  graphql(FETCH_LANGUAGES, { name: "fetchLanguages" }),
  withRouter,
  withStyles(styles),
  withApollo,
)(SelectCodeLanguage)
