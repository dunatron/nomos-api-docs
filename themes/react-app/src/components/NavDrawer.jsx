import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CategoryItem from './CategoryItem';
import MainContainer from '../containers/MainContainer';
import CreateDocsContainer from '../containers/CreateDocsContainer';
import LoginContainer from '../containers/JWTLoginForm'
import SettingsList from './SettingsList';
import CodeHighlighterSettings from './CodeHighlighterSettings';
import { BrowserRouter, Route, Switch, Link, withRouter } from 'react-router-dom';
import { withApollo, compose } from "react-apollo/index";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: "100%",
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: `calc(100% - ${drawerWidth}px)`,
    display: "flex",
    height: "100vh",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
  },
});

class NavDrawer extends React.Component {
  state = {
    anchor: 'left',
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    /**
     * ToDo: setup drawer and Tabs to be better. Causing infinite updates etc
     */
    const { classes, edges, codeExamples, validToken } = this.props;
    const { anchor, value } = this.state;
    console.log("Code examples in Nav DRAWER ", codeExamples)
    const drawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={anchor}
      >
        <div className={classes.toolbar} >
          <h1>Nomos Logo</h1>
        </div>
        <Divider />
        <LoginContainer />
        <Divider />
        {validToken ? this.renderAdminButtons() : null}
        <List>
          <SettingsList />
          {/* <CodeHighlighterSettings /> */}
        </List>
        <Divider />
        {edges && edges.map((d, i) =>
          <CategoryItem listValue={d} key={i} />
        )}
        <Divider />

      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
          </AppBar>
          {drawer}
          <main className={classes.content}>
            <Switch>
              <Route exact path='/' component={MainContainer} />
              <Route exact path='/create' component={CreateDocsContainer} />
            </Switch>
            {/* <MainContainer /> */}
          </main>
        </div>
      </div>
    );
  }

  handlePageChange = (url) => {
    console.log(url);
    //this.props.history.push(`/`)
    this.props.history.push(url)
    this.forceUpdate()
  };

  renderAdminButtons = () => {
    return (
      <div>
        <div onClick={() => this.handlePageChange("/")}>Main Docs</div>
        <div onClick={() => this.handlePageChange("/create")}>Create Docs</div>
      </div>
    )
  }

}

NavDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  edges: PropTypes.array
};

// export default withStyles(styles)(NavDrawer);

// export default compose(
//   withRouter,
//   withStyles(styles),
// )(NavDrawer)

export default withRouter(compose(
  withStyles(styles)
)(NavDrawer));