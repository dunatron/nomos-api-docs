import React, { Component } from 'react';
import { withStyles } from "material-ui/styles/index";
import { compose } from "react-apollo/index";
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import SettingsIcon from 'material-ui-icons/Settings';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import CodeHighlighterSettings from './CodeHighlighterSettings';

const styles = theme => ({
  progress: {
    margin: '100px'
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.secondary.main
    //backgroundColor: theme.palette.primary.main,
  },
  MuiListItemIcon: {
    color: theme.palette.secondary.main
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  button: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main
  },
  checkedNumber: {
    color: theme.palette.primary.main
  }
});

class SettingsList extends Component {


  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };


  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  render() {
    const { classes } = this.props;

    return <List className={classes.root} >
      <ListItem button onClick={this.handleClick}>
        <ListItemIcon className={classes.MuiListItemIcon}>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText inset primary={"Settings"} />
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit={false}>
        <CodeHighlighterSettings />
      </Collapse>
    </List>

  }
}

export default compose(
  withStyles(styles),
)(SettingsList);