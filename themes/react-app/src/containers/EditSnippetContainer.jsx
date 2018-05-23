import React, { Component, Fragment } from "react"
import { gql, compose, graphql } from "react-apollo"
import { connect } from "react-redux"
import { withApollo } from "react-apollo/index"
import { withRouter } from "react-router"
import { withStyles } from "material-ui/styles"
import BackButton from "../components/BackButton"
import TextField from "material-ui/TextField"
import Input, { InputLabel } from "material-ui/Input"
import classNames from "classnames"
import CodeSample from "../components/CodeSample"
import { GET_SINGLE_API_METHOD } from "../components/ApiMenuItem"

// components
import Loader from "../components/Loader"
import CodeSampleComponent from "../components/CodeSample"
import Button from "material-ui/Button"
import SelectApiMethod from "../components/SelectApiMethod"
import SelectCodeLanguage from "../components/SelectCodeLanguage"

// queries
import { FETCH_LANGUAGES } from "../queries/fetchLanguages"

// actions
import { setCurrentMethod } from "../actions/codeExamplesActions"

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

class EditSnippetContainer extends Component {
  state = {
    MethodID: this.props.originalMethodID,
    LanguageName: this.props.codeSample[0].LanguageName,
    //LanguageName: "Fraps",
    CodeSample: "",
    updating: false,
    updatingText: "",
    updated: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.MethodID !== this.state.MethodID) {
      return true
    }
    if (nextState.LanguageName !== this.state.LanguageName) {
      return true
    }
    if (nextState.CodeSample !== this.state.CodeSample) {
      return true
    }
    return false
  }

  render() {
    console.group("EditSnippetContainer")
    console.log("Spinnept Container Props ", this.props)
    console.log("code Sample Props ", this.props.codeSample)
    console.log("original Language ", this.props.codeSample.LanguageName)
    console.groupEnd()

    const { updating, updatingText } = this.state

    const {
      classes,
      codeSample: {
        0: { CodeSample, ID, LanguageName },
      },
      fetchLanguages: { readLanguages, loading },
    } = this.props

    console.log("Fetching original LanguageName ", this.state.LanguageName)

    return (
      // <Fragment>
      //   <h1>EDIT SNPIIET CONTAINER</h1>
      //   <p>{ID}</p>
      //   <p>{LanguageName}</p>
      //   <CodeSampleComponent CodeSample={CodeSample}/>

      //   <div onClick={() => this._updateCodeSample()}>UPDATE BUTTON</div>
      // </Fragment>
      <div className={classes.root}>
        {updating ? (
          <Loader loadingText={updatingText} />
        ) : (
          <Fragment>
            <BackButton />
            <form
              className={classes.formContainer}
              noValidate
              autoComplete="off"
              onSubmit={e => this._createCodeSample(e)}>
              <SelectApiMethod
                value={this.state.MethodID}
                methodIDChange={methodID => this.updateMethodID(methodID)}
              />
              <SelectCodeLanguage
                value={this.state.LanguageName}
                languageChange={languageName =>
                  this.updateLanguageName(languageName)
                }
              />

              {/* {this.selectLanguage(readLanguages)} */}
              <Button
                className={classes.button}
                variant="raised"
                color="primary"
                type="submit"
                onClick={e => this._updateCodeSample(e)}>
                Update Code Sample
              </Button>
            </form>
            {/* <div className={classes.codeEditor}>
              <CodeSample CodeSample={this.state.CodeSample} language={LanguageName} extraClass={classes.editorField} />
              <Input
                value={this.state.CodeSample}
                onChange={this.handleChange('CodeSample')}
                placeholder="Enter your code here"
                style={editorFieldStyle}
                multiline
                className={`${classes.input} ${classes.editorField}`}
                inputProps={{
                  'aria-label': 'code-editor',
                }}
              />
            </div> */}
          </Fragment>
        )}
      </div>
    )
  }

  updateMethodID = id => {
    this.setState({
      MethodID: id,
    })
  }

  updateLanguageName = languageName => {
    this.setState({
      LanguageName: languageName,
    })
  }

  _updateCodeSample = async e => {
    e.preventDefault()
    const { mutate } = this.props
    const { MethodID } = this.state
    const {
      codeSample: {
        0: { CodeSample, ID, LanguageName },
      },
    } = this.props
    console.log("Update Code Samples Props ", this.props)
    console.log("AHHH ", mutate)
    const response = await this.props.updateCodeSnippet({
      variables: {
        ID: ID,
        NewMethodID: MethodID,
        NewLanguageName: LanguageName,
        NewCodeSample: CodeSample,
      },
      refetchQueries: [
        {
          query: GET_SINGLE_API_METHOD,
          variables: {
            ID: MethodID,
          },
        },
        {
          query: GET_SINGLE_API_METHOD,
          variables: {
            ID: this.props.originalMethodID,
          },
        },
      ],
    })
    console.log("1")
    console.log("Update Response try catch", response)
    //this.props.history.push("/")
    //this.fetchApiMethod(this.props.originalMethodID)
    //this.fetchApiMethod(this.props.originalMethodID)
    // This is only working with the time out
    // Maybe after update has happened I give them an option
    // 1st try async await with time out set to nothing
    setTimeout(async () => {
      await this.fetchApiMethod(this.props.originalMethodID)
    }, 2000)
    // setTimeout(async () => {
    //   await this.fetchApiMethod(this.props.originalMethodID)
    // }, 500)
  }

  // fetchApiMethod = async ID => {
  //   await this.props.client
  //     .query({
  //       query: GET_SINGLE_API_METHOD,
  //       options: {
  //         fetchPolicy: "network-only",
  //       },
  //       variables: {
  //         ID: ID,
  //       },
  //     })
  //     .then(res => {
  //       console.log("THis SHould have updated data ", res)
  //       const method = res.data.getSingleMethod[0]
  //       // This is sent to redux and deconstructed as store object there
  //       // const { ID, Name, Description, HttpRequest, PermittedCall, CodeExamples, QueryParams } = method
  //       this.props.setCurrentMethod(method)
  //     })
  //     .then(() => {
  //       this.routeToHome()
  //     })
  // }

  fetchApiMethod = async ID => {
    try {
      const res = await this.props.client.query({
        query: GET_SINGLE_API_METHOD,
        options: {
          fetchPolicy: "network-only",
        },
        variables: {
          // ID: this.props.originalMethodID,
          ID: ID,
        },
      })
      console.log("2")
      console.log("Fetch after method after edit ", res)
      const method = res.data.getSingleMethod[0]
      // This is sent to redux and deconstructed as store object there
      // const { ID, Name, Description, HttpRequest, PermittedCall, CodeExamples, QueryParams } = method
      await this.props.setCurrentMethod(method)
      this.routeToHome()
    } catch (e) {
      alert("Error: ", e)
    }
    this.routeToHome()
  }

  routeToHome = () => {
    this.props.history.push("/")
  }
}

const UPDATE_CODE_SAMPLE = gql`
  mutation UpdateCodeSample(
    $ID: ID
    $NewMethodID: ID
    $NewLanguageName: String
    $NewCodeSample: String
  ) {
    updateCodeExample(
      ID: $ID
      NewMethodID: $NewMethodID
      NewLanguageName: $NewLanguageName
      NewCodeSample: $NewCodeSample
    ) {
      ID
      MethodID
      CodeSample
      LanguageName
    }
  }
`

const reduxWrapper = connect(
  (state, ownProps) => ({
    codeExamples: state.codeExamples.CodeExamples,
    codeSample: state.codeExamples.CodeExamples.filter(snippet => {
      // if(snipet.ID == ownProps.match.params.id){
      //   return snipet
      // }
      return snippet.ID === ownProps.match.params.id
    }),
    validToken: state.token.validToken,
    originalMethodID: state.codeExamples.ID,
  }),
  dispatch => ({
    setCurrentMethod: method => dispatch(setCurrentMethod(method)),
  })
)

export default compose(
  withRouter,
  withApollo,
  reduxWrapper,
  withStyles(styles),
  graphql(UPDATE_CODE_SAMPLE, { name: "updateCodeSnippet" }),
  graphql(FETCH_LANGUAGES, { name: "fetchLanguages" })
  // graphql(CategoriesQuery)
)(EditSnippetContainer)
