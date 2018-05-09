import React, { Component, Fragment } from 'react';
import {withStyles} from 'material-ui/styles';
import { connect } from "react-redux";
import { withApollo, compose } from "react-apollo/index";
import Button from 'material-ui/Button';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {withRouter} from 'react-router'
import AddCategory from '../components/AddCategory';
import AddMethod from '../components/AddMethod';
import AddCodeSample from '../components/AddCodeSample';

const styles = theme => ({
  root: {
    height: theme.spacing.unit * 6,
    minHeight: theme.spacing.unit * 6
  },
  button: {
    borderRadius: 0
  }
});

class CreateDocsContainer extends Component {

  render() {

    const {classes, match} = this.props

    console.log("MAtch Props ", this.props);

    return (
      <Fragment>


        <Route
          exact={true}
          path={match.url}
          render={() => (
            <Fragment>
              <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={() => this.handlePageChange('/create/category')} >Add Category</Button>
              <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={() => this.handlePageChange('/create/method')}>Add API Method</Button>
              <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={() => this.handlePageChange('/create/code-sample')}>Add Code Sample</Button>
            </Fragment>
          )}
        />



        <Route
          path={match.url + '/category'}
          component={AddCategory}
        />
        <Route
          path={match.url + '/method'}
          component={AddMethod}
        />
        <Route
          path={match.url + '/code-sample'}
          component={AddCodeSample}
        />
        
        {/*
        ToDo: react router /create/category || /create/method || /create/code-sample
        */}
      </Fragment>
    )
  }

  handlePageChange = (url) => {
    console.log(url);
    //this.props.history.push(`/`)
    this.props.history.push(url)
    this.forceUpdate()
  };

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
)(CreateDocsContainer);