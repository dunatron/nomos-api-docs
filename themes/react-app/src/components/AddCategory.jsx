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

class AddCategory extends Component {

  state = {
    Name: "",
    adding: false,
    addingText: ''
  };

  render() {
    const { classes, match } = this.props
    const {adding, addingText} = this.state

    return (
      <div className={classes.root}>
        {adding ? <Loader loadingText={addingText}/> :
          <Fragment>
            <BackButton />
            <form className={classes.formContainer} noValidate autoComplete="off" onSubmit={(e) => this.addCategory(e)}>
              <TextField
                id="Name"
                label="Name"
                className={classes.textField}
                value={this.state.Name}
                onChange={this.handleChange('Name')}
                margin="normal"
              />
              <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={(e) => this._createCategory(e)} >Add Category</Button>
            </form>
          </Fragment>
        }
      </div>
    )
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleBackAction = () => {
    this.props.history.goBack()
  }

  addCategory = async (e) => {
    e.preventDefault()
    this.handleBackAction()
  }

  _createCategory = async (e) => {
    e.preventDefault()
    const { Name } = this.state;
    this.setState({
      adding: true,
      addingText: `Creating "${Name}" Category`
    })

    await this.props.createCategoryMutation({
      variables: {
        Name
      },
      update: (store, { data: { createCategory } }) => {

        const data = store.readQuery({ query: ALL_API_CATEGORIES_WITH_DATA })
        data.readCategories.edges.splice(0, 0, { node: createCategory, __typename: "readCategoriesEdge" })
        store.writeQuery({
          query: ALL_API_CATEGORIES_WITH_DATA,
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

const CREATE_CATEGORY_MUTATION = gql`
mutation CreateLinkMutation($Name: String) {
  createCategory(Input: {
    Name: $Name
  }) {
    ID,
    Name,
    Methods {
      edges {
        node {
          ID
          Name
        }
      }
    }
  }
}
`;

export default compose(
  graphql(CREATE_CATEGORY_MUTATION, { name: 'createCategoryMutation' }),
  withRouter,
  withStyles(styles),
  withApollo,
  reduxWrapper,
)(AddCategory);