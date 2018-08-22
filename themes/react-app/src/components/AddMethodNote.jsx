import React, { Component, Fragment } from "react"
import { graphql, gql, compose, withApollo } from "react-apollo"
import { withStyles } from "material-ui/styles"
import { connect } from "react-redux"
import Button from "material-ui/Button"
import BackButton from "./BackButton"
import TextField from "material-ui/TextField"
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import { withRouter } from "react-router"
import { ALL_API_CATEGORIES_WITH_DATA } from "../containers/ApiCategoriesList"
import Loader from "./Loader"
import AlertMessage from "./AlertMessage"

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    textAlign: "left",
  },
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    borderRadius: 0,
  },
})

class AddMethodNote extends Component {
  state = {
    Name: "",
    Description: "",
    adding: false,
    addingText: "",
    added: false,
  }

  render() {
    const { methodID, classes, match } = this.props
    const { adding, addingText, added } = this.state

    if (!methodID) {
      return null
    }

    return (
      <div className={classes.root}>
        {added && (
          <AlertMessage
            open={true}
            alertText={"Note has been created"}
            dismissAlert={() => this.setState({ added: false })}
          />
        )}
        {adding ? (
          <Loader loadingText={addingText} />
        ) : (
          <Fragment>
            <form
              className={classes.formContainer}
              noValidate
              autoComplete="off"
              onSubmit={e => this.addCategory(e)}>
              <TextField
                id="noteName"
                label="Note Name"
                className={classes.textField}
                value={this.state.Name}
                onChange={this.handleChange("Name")}
                margin="normal"
              />
              <TextField
                id="noteDescription"
                label="Note Description"
                className={classes.textField}
                value={this.state.Description}
                onChange={this.handleChange("Description")}
                margin="normal"
              />
              <Button
                className={classes.button}
                variant="raised"
                color="primary"
                type="submit"
                onClick={e => this._createNote(e)}>
                Add Note
              </Button>
            </form>
          </Fragment>
        )}
      </div>
    )
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  _createNote = async e => {
    e.preventDefault()
    const { Name, Description } = this.state
    const { methodID } = this.props
    this.setState({
      adding: true,
      addingText: `Creating note: "${Name}"`,
    })

    const res = await this.props.createMethodNote({
      variables: {
        methodID: methodID,
        name: Name,
        description: Description,
      },
      // update: (store, { data: { createCategory } }) => {
      //   const data = store.readQuery({ query: ALL_API_CATEGORIES_WITH_DATA })
      //   data.readCategories.edges.splice(0, 0, {
      //     node: createCategory,
      //     __typename: "readCategoriesEdge",
      //   })
      //   store.writeQuery({
      //     query: ALL_API_CATEGORIES_WITH_DATA,
      //     data,
      //   })
      // },
    })
    this.setState({
      adding: false,
      added: true,
    })

    // this.handleBackAction()
  }
}

const reduxWrapper = connect(state => ({
  CurrentMethod: state.codeExamples,
}))

const CREATE_METHOD_NOTE = gql`
  mutation createMethodNote(
    $methodID: ID!
    $name: String!
    $description: String!
  ) {
    createMethod_Note(
      Input: { MethodID: $methodID, Name: $name, Description: $description }
    ) {
      ID
      Name
      Description
    }
  }
`

export default compose(
  graphql(CREATE_METHOD_NOTE, { name: "createMethodNote" }),
  withRouter,
  withStyles(styles),
  withApollo,
  reduxWrapper
)(AddMethodNote)
