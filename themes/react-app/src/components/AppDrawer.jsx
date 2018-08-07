import React, { Fragment } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { withStyles } from "material-ui/styles"
import Drawer from "material-ui/Drawer"
import AppBar from "material-ui/AppBar"
import List from "material-ui/List"
import Divider from "material-ui/Divider"
import CategoryItem from "./CategoryItem"
import NomosLogo from "../img/nomos-logo.png"
import MainContainer from "../containers/MainContainer"
import CreateDocsContainer from "../containers/CreateDocsContainer"
import EditSnippetContainer from "../containers/EditSnippetContainer"
import LoginContainer from "../containers/JWTLoginForm"
import SettingsList from "./SettingsList"
import NavBar from "./NavBar"
import CodeHighlighterSettings from "./CodeHighlighterSettings"
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  "appBar-left": {
    marginLeft: drawerWidth,
  },
  "appBar-right": {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
  },
  toolbar: {},
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
    const { classes, edges, codeExamples, validToken, children } = this.props
    const { anchor, value } = this.state
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={anchor}>
        <div className={classes.toolbar}>
          <img src={NomosLogo} className="nomos-logo" alt="nomos logo" />
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
        {/* {edges && edges.map((d, i) => <CategoryItem listValue={d} key={i} />)} */}

        {children &&
          children.map(component => {
            return component
          })}

        <Divider />
      </Drawer>
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
  withStyles(styles)
)(AppDrawer)
