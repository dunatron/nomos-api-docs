import React, { Component, Fragment } from 'react';
import { graphql, gql, compose, withApollo } from 'react-apollo'
import { withStyles } from 'material-ui/styles';
import { connect } from "react-redux";
import Button from 'material-ui/Button';
import BackButton from './BackButton';
import TextField from 'material-ui/TextField';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { ALL_API_CATEGORIES_WITH_DATA } from '../containers/ApiCategoriesList'
import Loader from './Loader'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    textAlign: 'left'
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    borderRadius: 0
  }
});

class AddLanguage extends Component {

  state = {
    Name: "",
    adding: false,
    addingText: ''
  };

  render() {
    const { classes, match, fetchLanguages: { loading, readLanguages } } = this.props
    const { adding, addingText } = this.state

    if (loading) {
      return <Loader loadingText={'Fetching Languages'} />
    }

    return (
      <div className={classes.root}>
        {adding ? <Loader loadingText={addingText} /> :
          <Fragment>
            <BackButton />
            <form className={classes.formContainer} noValidate autoComplete="off" onSubmit={(e) => this._createLanguage(e)}>
              <TextField
                id="Name"
                label="Name"
                className={classes.textField}
                value={this.state.Name}
                onChange={this.handleChange('Name')}
                margin="normal"
              />
              <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={(e) => this._createLanguage(e)} >Add Category</Button>
            </form>
            {this.renderLanguages(readLanguages)}
          </Fragment>
        }
      </div>
    )
  }

  renderLanguages = (languages) => {
    return languages.map((language, idx) => {
      return <h1 key={idx}>{language.Name}</h1>
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleBackAction = () => {
    this.props.history.goBack()
  }

  _createLanguage = async (e) => {
    e.preventDefault()
    const { Name } = this.state;
    this.setState({
      adding: true,
      addingText: `Creating "${Name}" Language`
    })

    await this.props.createLanguage({
      variables: {
        Name
      },
      update: (store, { data: { createLanguage } }) => {
        const data = store.readQuery({ query: FETCH_LANGUAGES })
        console.log('New Language Obj ', createLanguage)
        console.log('Try if we already have query? Data ', data)
        console.log('Need To?? store', store)
        data.readLanguages.splice(0,0, createLanguage)
        // data.readCategories.edges.splice(0, 0, { node: createCategory, __typename: "readCategoriesEdge" })
        store.writeQuery({
          query: FETCH_LANGUAGES,
          data
        })
      }
    });

    this.handleBackAction()
  }

}

const reduxWrapper = connect(
  state => ({
    CurrentMethod: state.codeExamples
  })
);

export const CREATE_LANGUAGE = gql`
mutation CreateLanguage($Name: String){
  createLanguage(Input:{
    Name:$Name
  }) {
    Name
  }
}
`

export const FETCH_LANGUAGES = gql`
query readLanguages {
  readLanguages {
    Name
  }
}
`

export default compose(
  graphql(FETCH_LANGUAGES, { name: 'fetchLanguages' }),
  graphql(CREATE_LANGUAGE, { name: 'createLanguage' }),
  withRouter,
  withStyles(styles),
  withApollo,
  reduxWrapper,
)(AddLanguage);