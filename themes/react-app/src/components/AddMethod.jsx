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
import AddQueryParam from './AddQueryParam'
import IconButton from 'material-ui/IconButton';
import TrashIcon from 'material-ui-icons/Remove';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    textAlign: 'left'
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: theme.spacing.unit * 4
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
  paramRow: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  paramRowItem: {
    //flexGrow: 1
  }
});

class AddMethod extends Component {

  state = {
    CategoryID: '',
    Name: "",
    Description: "",
    HttpRequest: "",
    PermittedCall: "",
    QueryParameters: []
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
        <form className={classes.formContainer} noValidate autoComplete="off" onSubmit={(e) => this._createApiMethod(e)}>
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
          {this.renderCurrentParams()}
          <AddQueryParam addParam={({ paramName, paramDescription }) => this._addParam({ paramName, paramDescription })} />
          <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={(e) => this._createApiMethod(e)} >Add Api Method</Button>
        </form>
      </div>
    )
  }

  renderCurrentParams = () => {
    const { classes } = this.props
    return this.state.QueryParameters.map((d, i) => {
      return (
        <div className={classes.paramRow} key={i}>
          <span className={classes.paramRowItem}>{d.Parameter}</span>
          <span className={classes.paramRowItem}>{d.Description}</span>
          <IconButton className={classNames(classes.button, classes.paramRowItem)} aria-label="Delete" color="primary" onClick={() =>
            this._removeParam(i)}>
            <TrashIcon />
          </IconButton>
        </div>
      )
    })
  }


  _addParam = ({ paramName, paramDescription }) => {
    let newParam = { Parameter: paramName, Description: paramDescription }
    const queryParams = this.state.QueryParameters.concat(newParam)
    this.setState({
      QueryParameters: queryParams
    })
  }

  _removeParam = (index) => {
    let params = this.state.QueryParameters
    params.splice(index, 1)
    this.setState({
      QueryParameters: params
    })
  }


  handleSelectChange = (name, value) => {
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
    this.handleBackAction()
  }



  _createApiMethod = async (e) => {
    e.preventDefault()
    const { Name, CategoryID, Description, HttpRequest, PermittedCall, QueryParameters } = this.state;
    let newMethodID
    // 1. create new method 
    await this.props.createMethodMutation({
      variables: {
        CategoryID,
        Name,
        Description,
        HttpRequest,
        PermittedCall
      },
      // 2. update our cache with new method
      update: (store, { data: { createMethod } }) => {
        newMethodID = createMethod.ID
        const data = store.readQuery({ query: ALL_API_CATEGORIES_WITH_DATA })



        console.log('Check DATA Async?? await? ', JSON.parse(JSON.stringify(data)))

        createMethod['__typename'] = 'SUCKIT'

        data.readCategories.edges.map((d, i) => {
          if (d.node.ID === CategoryID) {
           // data.readCategories.edges[i].node.Methods.edges.splice(0, 0, { node: createMethod })
            data.readCategories.edges[i].node.Methods.edges.push({ node: createMethod })

          }
        })

        console.log('REDING AFTER: ', data)

        store.writeQuery({
          query: ALL_API_CATEGORIES_WITH_DATA,
          data
        })
        console.groupEnd()
      }
    });
    //3. loop over query Params
    QueryParameters.map((d, i) => {
      this._createQueryParameter(d, newMethodID)
    })

   //this.handleBackAction()
  }

  // 4. save any QueryParameters against method
  // No need to update cache because this data is not stored in the app
  _createQueryParameter = async ({ Parameter, Description }, methodID) => {
    await this.props.createQueryParamMutation({
      variables: {
        MethodID: methodID,
        Parameter,
        Description
      }
    })
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
) 
{
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
      LanguageName
      CodeSample
    }
  }
}
`;

const CREATE_QUERY_PARAM_MUTATION = gql`
mutation createQueryParam(
  $MethodID: ID!,
  $Parameter: String, 
  $Description: String
) {
  createQuery_Param(Input:{
   MethodID: $MethodID,
   Parameter: $Parameter,
   Description: $Description
 }) {
     Parameter
     Description
   }
 }
`;



export default compose(
  graphql(CREATE_METHOD_MUTATION, { name: 'createMethodMutation' }),
  graphql(CREATE_QUERY_PARAM_MUTATION, { name: 'createQueryParamMutation' }),
  withRouter,
  withStyles(styles),
  withApollo,
  reduxWrapper,
)(AddMethod);