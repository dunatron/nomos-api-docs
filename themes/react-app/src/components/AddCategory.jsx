import React, { Component, Fragment } from 'react';
import {withStyles} from 'material-ui/styles';
import { connect } from "react-redux";
import { withApollo, compose } from "react-apollo/index";
import Button from 'material-ui/Button';
import BackButton from './BackButton';
import TextField from 'material-ui/TextField';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {withRouter} from 'react-router'

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
  }
});

class AddCategory extends Component {

  state = {
    categoryName: ""
  };

  render() {
    const {classes, match} = this.props

    return (
      <div className={classes.root}>
        <BackButton />
        <form className={classes.formContainer} noValidate autoComplete="off" onSubmit={(e) => this.addCategory(e)}>
        <TextField
          id="categoryName"
          label="categoryName"
          className={classes.textField}
          value={this.state.categoryName}
          onChange={this.handleChange('categoryName')}
          margin="normal"
        />
          <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={(e) => this.addCategory(e)} >Add Category</Button>
        </form>
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
    console.log('ADDING NEW CATEGORY ', this.state.categoryName)
    this.handleBackAction()
  }

}

const reduxWrapper = connect(
  state => ({
    CurrentMethod: state.codeExamples
  })
);

export default compose(
  withRouter,
  withStyles(styles),
  withApollo,
  reduxWrapper,
)(AddCategory);