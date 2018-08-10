import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Toolbar from "material-ui/Toolbar"
import Typography from "material-ui/Typography"
import IconButton from "material-ui/IconButton"
import MenuIcon from "material-ui-icons/Menu"
import AccountCircle from "material-ui-icons/AccountCircle"
import Menu, { MenuItem } from "material-ui/Menu"
import { withRouter } from "react-router"
import { compose } from "react-apollo/index"
import Hidden from "material-ui/Hidden"
import BackButton from "./BackButton"

const styles = theme => ({
  root: {
    height: theme.spacing.unit * 6,
    minHeight: theme.spacing.unit * 6,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

class NavBar extends Component {
  state = {
    auth: true,
    anchorEl: null,
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handlePageChange = url => {
    this.handleClose()
    this.props.history.push(url)
  }

  render() {
    const { classes, history } = this.props
    const { pathname } = history.location
    const { auth, anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <Toolbar className={classes.root}>
        <Hidden mdUp>
          <IconButton
            aria-owns={open ? "menu-appbar" : null}
            aria-haspopup="true"
            onClick={() => this.props.toggleAppDrawer()}
            color="inherit">
            <MenuIcon />
          </IconButton>
        </Hidden>
        {pathname && pathname !== "/" && <BackButton />}
        <Typography variant="title" color="inherit" className={classes.flex}>
          TrN
        </Typography>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu">
          <AccountCircle />
        </IconButton>
        <IconButton
          aria-owns={open ? "menu-appbar" : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit">
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={this.handleClose}>
          <MenuItem onClick={() => this.handlePageChange("/")}>Home</MenuItem>
          <MenuItem onClick={() => this.handlePageChange("/about")}>
            About Page
          </MenuItem>
          <MenuItem onClick={() => this.handlePageChange("/create")}>
            Create Docs
          </MenuItem>
          <MenuItem onClick={() => this.handlePageChange("/methods")}>
            Methods List
          </MenuItem>
          <MenuItem onClick={() => this.handlePageChange("/docgen")}>
            Doc Gen
          </MenuItem>
        </Menu>
      </Toolbar>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(compose(withStyles(styles))(NavBar))
