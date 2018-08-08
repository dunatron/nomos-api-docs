import React, { Component, Fragment } from "react"
import gql, { resetCaches } from "graphql-tag"
import { graphql, compose } from "react-apollo"
import LoginForm from "../components/LoginForm"
import AlertMessage from "../components/AlertMessage"
import {
  setToken,
  setFirstName,
  setUserName,
  logoutUser,
} from "../actions/tokenActions"
import { connect } from "react-redux"
import Button from "material-ui/Button"
import Loader from "../components/Loader"

class JWTLoginForm extends Component {
  constructor(props) {
    super(props)
    this.checkValidToken()
    this.state = {
      inValidCredentials: false,
      loading: false,
    }
  }

  checkValidToken = () => {
    console.log("Can we call CLIENT? ", this.props.client)
  }

  onSubmit = (Email, Password) => {
    const { mutate } = this.props
    this.setState({ loading: true })
    mutate({
      variables: {
        Email,
        Password,
      },
    })
      .then(response => {
        console.log("Token Response ", response)
        if (response.data.createToken.Token === null) {
          console.log("INVALID CREDS")
          this.inValidCredentials()
        } else if (response.data.createToken.Token.length > 10) {
          this.validCredentials(response.data.createToken)
        }
      })
      .then(() => {
        this.setState({
          loading: false,
        })
      })
  }

  render() {
    const { inValidCredentials, loading } = this.state

    if (loading) {
      return <Loader size={30} loadingText={"logging In"} fontSize={11} />
    }

    const {
      token: { firstName, token, userName, validToken },
    } = this.props
    return (
      <Fragment>
        {inValidCredentials ? (
          <AlertMessage
            open={true}
            alertText={"Invalid credentials"}
            dismissAlert={() => this.setState({ inValidCredentials: false })}
          />
        ) : null}

        {validToken ? (
          this.logoutBtn(userName ? userName : firstName)
        ) : (
          <LoginForm onSubmit={this.onSubmit} />
        )}
      </Fragment>
    )
  }

  inValidCredentials = () => {
    this.setState({
      inValidCredentials: true,
    })
  }

  validCredentials = data => {
    this.setState({
      inValidCredentials: false,
      loggedIn: true,
    })
    this.props.setToken(data.Token)
    this.props.setFirstName(data.FirstName)
  }

  logoutBtn = name => {
    return (
      <Button
        variant="raised"
        color="primary"
        type="submit"
        onClick={() => this.logout()}>
        Log Out {name}
      </Button>
    )
  }

  logout = () => {
    this.props.logoutUser()
  }
}

const tokenMutation = gql`
  mutation createToken($Email: String!, $Password: String!) {
    createToken(Email: $Email, Password: $Password) {
      ID
      FirstName
      Token
    }
  }
`
// export default graphql(tokenMutation)(JWTLoginForm);

const reduxWrapper = connect(
  state => ({
    token: state.token,
  }),
  dispatch => ({
    setToken: token => dispatch(setToken(token)),
    setFirstName: name => dispatch(setFirstName(name)),
    logoutUser: () => dispatch(logoutUser()),
    // actions: {
    //   setToken: bindActionCreators(setToken, dispatch),
    // }
  })
)

export default compose(
  reduxWrapper,
  graphql(tokenMutation)
)(JWTLoginForm)
