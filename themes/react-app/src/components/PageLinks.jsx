import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import List from "material-ui/List/List"
import ListItem from "material-ui/List/ListItem"
import ListItemIcon from "material-ui/List/ListItemIcon"
import ListItemText from "material-ui/List/ListItemText"
import Divider from "material-ui/Divider/Divider"
import InboxIcon from "material-ui-icons/Inbox"
import DraftsIcon from "material-ui-icons/Drafts"
import { withRouter } from "react-router"
import { compose } from "react-apollo/index"

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})

const PageLinks = props => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button onClick={() => props.history.push("/")}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Home Page" />
        </ListItem>
        <ListItem button onClick={() => props.history.push("/methods")}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Methods List" />
        </ListItem>
        <ListItem button onClick={() => props.history.push("/create")}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Create Stuff" />
        </ListItem>
        <ListItem button onClick={() => props.history.push("/docgen")}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Doc Gen" />
        </ListItem>
      </List>
    </div>
  )
}
PageLinks.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(compose(withStyles(styles))(PageLinks))
