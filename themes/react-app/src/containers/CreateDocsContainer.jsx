import React, { Component, Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from "react-redux";
import { withApollo, compose } from "react-apollo/index";
import Button from 'material-ui/Button';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import AddCategory from '../components/AddCategory';
import AddMethod from '../components/AddMethod';
import AddLanguage from '../components/AddLanguage';
import AddCodeSample from '../components/AddCodeSample';
//Icons
import CodeIcon from 'material-ui-icons/Code';
import CreateNewFolderIcon from 'material-ui-icons/CreateNewFolder';
import AllInclusiveIcon from 'material-ui-icons/AllInclusive';

const styles = theme => ({
  root: {
    height: theme.spacing.unit * 6,
    minHeight: theme.spacing.unit * 6
  },
  button: {
    borderRadius: 0,
    flexGrow: 1
  },
  btnContents: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  iconBig: {
    fontSize: 80,
  },
});

class CreateDocsContainer extends Component {

  render() {
    const { classes, match } = this.props

    return (
      <Fragment>


        <Route
          exact={true}
          path={match.url}
          render={() => (
            <Fragment>
              <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={() => this.handlePageChange('/create/category')} >
                <div className={classes.btnContents}>
                  <CreateNewFolderIcon className={classes.iconBig} />
                  Add Category
                </div>
              </Button>
              <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={() => this.handlePageChange('/create/method')}>
                <div className={classes.btnContents}>
                  <AllInclusiveIcon className={classes.iconBig} />
                  Add API Method
                </div>
              </Button>
              <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={() => this.handlePageChange('/create/language')}>
                <div className={classes.btnContents}>
                  <CodeIcon className={classes.iconBig} />
                  Add Language
                </div>
              </Button>
              <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={() => this.handlePageChange('/create/code-sample')}>
                <div className={classes.btnContents}>
                  <CodeIcon className={classes.iconBig} />
                  Add Code Sample
                </div>
              </Button>
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
          path={match.url + '/language'}
          component={AddLanguage}
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
    this.props.history.push(url)
    //this.forceUpdate()
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