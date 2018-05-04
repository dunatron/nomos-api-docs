import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import CategoryItem from './CategoryItem';
import MainLeft from './MainLeft';
import MainRight from './MainRight';

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
    display: "flex",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
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
    const { classes, edges, codeExamples } = this.props;
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
        {edges && edges.map((d, i) =>
          <CategoryItem listValue={d} key={i} />
        )}
        <Divider />
        <List>
          <li>List Item</li>
        </List>
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
          >
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Permanent drawer
              </Typography>
              <Tabs
                value={value}
                onChange={(val) => this.handleChange(val)}
                indicatorColor="primary"
                textColor="secondary"
                scrollable
                scrollButtons="auto"
              >
                {codeExamples && codeExamples.map((d, i) => {
                  return <Tab key={i} label={d.Title} />
                })}
              </Tabs>
            </Toolbar>
          </AppBar>
          {drawer}
          <main className={classes.content}>
            <MainLeft />
            <MainRight />
          </main>
        </div>
      </div>
    );
  }
}

NavDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  edges: PropTypes.array
};

export default withStyles(styles)(NavDrawer);