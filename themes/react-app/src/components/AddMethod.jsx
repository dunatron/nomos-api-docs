import React, { Component, Fragment } from 'react';
import { graphql, gql, compose, withApollo } from 'react-apollo'
import { withStyles } from 'material-ui/styles';
import { connect } from "react-redux";
import Button from 'material-ui/Button';
import BackButton from './BackButton';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { ALL_API_CATEGORIES_WITH_DATA } from '../containers/ApiCategoriesList'

const styles = theme => ({
  root: {
    textAlign: 'left'
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    borderRadius: 0
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class AddMethod extends Component {

  state = {
    CategoryID: '',
    Name: "",
    Description: "",
    HttpRequest: "",
    PermittedCall: ""
  };

  render() {
    const { classes, match, client } = this.props
    const data = client.readQuery({
      query: ALL_API_CATEGORIES_WITH_DATA,
    });
    const allCategories = data.readCategories.edges

    return (
      <div className={classes.root}>
        <BackButton />
        <form className={classes.formContainer} noValidate autoComplete="off" onSubmit={(e) => this.addCategory(e)}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              value={this.state.CategoryID}

              onChange={this.handleChange('CategoryID')}
              inputProps={{
                name: 'CategoryID',
                id: 'CategoryID',
              }}
            >
              {allCategories.map((d, i) => {
                return <MenuItem value={d.node.ID}>{d.node.Name}</MenuItem>
              })}
            </Select>
          </FormControl>
          <TextField
            id="Name"
            label="Name"
            className={classes.textField}
            value={this.state.Name}
            onChange={this.handleChange('Name')}
            margin="normal"
          />
          <TextField
            id="Description"
            label="Description"
            className={classes.textField}
            value={this.state.Description}
            onChange={this.handleChange('Description')}
            margin="normal"
          />
          <TextField
            id="HttpRequest"
            label="HttpRequest"
            className={classes.textField}
            value={this.state.HttpRequest}
            onChange={this.handleChange('HttpRequest')}
            margin="normal"
          />
          <TextField
            id="PermittedCall"
            label="PermittedCall"
            className={classes.textField}
            value={this.state.PermittedCall}
            onChange={this.handleChange('PermittedCall')}
            margin="normal"
          />
          <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={(e) => this._createCategory(e)} >Add Api Method</Button>
        </form>
      </div>
    )
  }


  handleSelectChange = (name, value) => {
    console.log('Handel select Change Name: ', name)
    console.log('Handel select Change Value: ', value)
    this.setState({ name: value });
  };

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
    console.log('ADDING NEW CATEGORY ', this.state.Name)
    this.handleBackAction()
  }

  _createCategory = async (e) => {
    e.preventDefault()
    const { Name, CategoryID, Description, HttpRequest, PermittedCall } = this.state;

    await this.props.createMethodMutation({
      variables: {
        CategoryID,
        Name,
        Description,
        HttpRequest,
        PermittedCall
      },
      update: (store, { data: { createMethod } }) => {
        console.group('Update InMemoryCache')
        console.log('store ', store)
        console.log('create Method ', createMethod)

        //createCategory.Methods.edges = []

        const data = store.readQuery({ query: ALL_API_CATEGORIES_WITH_DATA })
        console.log('Store read query ', data)


        data.readCategories.edges.map((d, i) => {
          if (d.node.ID === CategoryID) {
            data.readCategories.edges[i].node.Methods.edges.splice(0, 0, { node: createMethod })
          }
        })
        console.log('Updated Cahce splice and dice ', data)

        // data.readCategories.edges.splice(0, 0, { node: createCategory })
        store.writeQuery({
          query: ALL_API_CATEGORIES_WITH_DATA,
          data
        })
        console.groupEnd()
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

const CREATE_METHOD_MUTATION = gql`
mutation CreateMethodMutation(
  $CategoryID:ID, 
  $Name:String,
  $Description:String,
  $HttpRequest:String, 
  $PermittedCall:String
  
) {
    createMethod(Input: {
      CategoryID:$CategoryID
      Name: $Name, 
      Description: $Description,
      HttpRequest: $HttpRequest,
      PermittedCall: $PermittedCall
      
    }) {
    ID,
    Name,
    Description
    HttpRequest
    PermittedCall
    CodeExamples {
      ID
      Title
      CodeSample
    }
  }
}
`;

export default compose(
  graphql(CREATE_METHOD_MUTATION, { name: 'createMethodMutation' }),
  withRouter,
  withStyles(styles),
  withApollo,
  reduxWrapper,
)(AddMethod);