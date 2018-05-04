import React, { Component } from 'react';
import { withStyles } from "material-ui/styles/index";
import { compose } from "react-apollo/index";
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import FolderIcon from 'material-ui-icons/Folder';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ApiMenuItem from './ApiMenuItem'

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

class CategoryItem extends Component {


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
    const { classes, listValue: { node } } = this.props;

    return <List className={classes.root} >
      <ListItem button onClick={this.handleClick}>
        <ListItemIcon className={classes.MuiListItemIcon}>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText inset primary={node.Name} />
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit={false}>
        {/* <SecondaryCategories categories={SecondaryTags} updateCheckNumber={(num)=> this.changeNumberChecked(num)} /> */}
        {node.ApiMethods.edges.length >= 1 && <ApiMenuItem methodList={node.ApiMethods} />}
      </Collapse>
    </List>

  }
}

export default compose(
  withStyles(styles),
)(CategoryItem);