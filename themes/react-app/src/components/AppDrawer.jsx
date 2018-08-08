import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Drawer from "material-ui/Drawer"
import List from "material-ui/List"
import Divider from "material-ui/Divider"
import NomosLogo from "../img/nomos-logo.png"
import LoginContainer from "../containers/JWTLoginForm"
import SettingsList from "./SettingsList"
import { withRouter } from "react-router"
import { compose } from "react-apollo/index"
import Hidden from "material-ui/Hidden"

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%",
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  logoContainer: {
    minHeight: "220px",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative",
    },
  },
  content: {
    width: `calc(100% - ${drawerWidth}px)`,
    display: "flex",
    overflow: "auto",
    height: `calc(100vh - ${theme.spacing.unit * 6}px)`,
    marginTop: theme.spacing.unit * 6,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
  },
})

class AppDrawer extends React.Component {
  state = {
    anchor: "left",
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    /**
     * ToDo: setup drawer and Tabs to be better. Causing infinite updates etc
     */
    const { classes, theme, validToken, mobileIsOpen, children } = this.props
    const { anchor, value } = this.state

    const drawInnards = (
      <Fragment>
        <div className={classes.logoContainer}>
          <img src={NomosLogo} className="nomos-logo" alt="nomos logo" />
        </div>
        <Divider />
        <LoginContainer />
        <Divider />
        {validToken ? this.renderAdminButtons() : null}
        <List>
          <SettingsList />
        </List>
        <Divider />
        {children &&
          children.map(component => {
            return component
          })}
        <Divider />
      </Fragment>
    )

    return (
      <Fragment>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileIsOpen}
            onClose={() => this.props.handleDrawerToggle()}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            {drawInnards}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor={anchor}>
            {drawInnards}
          </Drawer>
        </Hidden>
      </Fragment>
    )
  }

  handlePageChange = url => {
    //this.props.history.push(`/`)
    this.props.history.push(url)
    this.forceUpdate()
  }

  renderAdminButtons = () => {
    return (
      <div>
        <div onClick={() => this.handlePageChange("/")}>Main Docs</div>
        <div onClick={() => this.handlePageChange("/create")}>Create Docs</div>
      </div>
    )
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true })
)(AppDrawer)
