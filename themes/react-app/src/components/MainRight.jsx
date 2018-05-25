import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import AppBar from "material-ui/AppBar"
import Tabs, { Tab } from "material-ui/Tabs"
import TextField from "material-ui/TextField"
import Typography from "material-ui/Typography"
import CodeSample from "./CodeSample"
import { gql, compose, graphql } from "react-apollo"
import { withApollo } from "react-apollo/index"
import { withRouter } from "react-router"
// Icons
import IconButton from "material-ui/IconButton"
import DeleteForeverIcon from "material-ui-icons/DeleteForever"
import EditIcon from "material-ui-icons/Edit"
import LeftArrow from "material-ui-icons/KeyboardArrowLeft"

function TabContainer(props) {
  return (
    <Typography
      component="div"
      style={{ padding: 0, height: `calc(100vh - 96px)` }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    flexBasis: 0,
    minWidth: "50%",
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing.unit * 6,
    // height: '100vh',
  },
  subtleControls: {
    position: "absolute",
    bottom: "40px",
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid red",
    height: "60px",
    width: "100%",
    maxWidth: "40px",
    transition: "max-width 1s ease",
    "&:hover": {
      maxWidth: "200px",
    },
  },
  stickyControls: {
    maxWidth: "200px",
  },
})

class MainRight extends React.Component {
  state = {
    tabValue: 0,
    editing: false,
    isSticky: false,
  }

  handleTabChange = (event, value) => {
    this.setState({ tabValue: value, editing: false })
  }

  handleEditChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  generateTabContainers = CodeExamples => {
    const { tabValue, editing, isSticky } = this.state
    const { classes } = this.props
    return CodeExamples.map((data, index) => {
      if (tabValue === index) {
        return (
          <TabContainer>
            {editing ? (
              <Fragment>
                'Edit Mode || Probs render entire new View WIth Cancel etc'
                {/*<div onClick={() => this.setState({editing:false})}>Save BUTTON </div>*/}
              </Fragment>
            ) : (
              <Fragment>
                <CodeSample CodeSample={data.CodeSample} />
                {/*<div className={'Subtle-controls'}>*/}
                {/*<div className={classes.subtleControls}>*/}
                {/*<div onClick={() => this.setState({editing:true, editingText: data.CodeSample})}>EDIT BUTTON </div>*/}
                {/*</div>*/}
              </Fragment>
            )}
            <div
              className={
                isSticky
                  ? `${classes.subtleControls} ${classes.stickyControls}`
                  : classes.subtleControls
              }>
              <IconButton
                onClick={() => {
                  this.toggleSticky()
                }}
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu">
                <LeftArrow />
              </IconButton>
              <IconButton
                onClick={() => this.editCodeSample(data.ID)}
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu">
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => alert("Implement Delete action")}
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu">
                <DeleteForeverIcon />
              </IconButton>
            </div>
          </TabContainer>
        )
      } else {
        return null
      }
    })
  }

  toggleSticky = () => {
    let value = !this.state.isSticky
    this.setState({
      isSticky: value,
    })
  }

  editCodeSample = id => {
    this.props.history.push(`/edit-snippet/${id}`)
  }

  render() {
    const { classes, CodeExamples } = this.props
    const { tabValue } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={tabValue}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto">
            {CodeExamples &&
              CodeExamples.map((d, i) => {
                return <Tab key={i} label={d.LanguageName} />
              })}
            {/* <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
            <Tab label="Item Six" />
            <Tab label="Item Seven" /> */}
          </Tabs>
        </AppBar>

        {CodeExamples && this.generateTabContainers(CodeExamples)}

        {/* {this.generateTabContainers(CodeExamples)} */}

        {/* {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>}
        {value === 4 && <TabContainer>Item Five</TabContainer>}
        {value === 5 && <TabContainer>Item Six</TabContainer>}
        {value === 6 && <TabContainer>Item Seven</TabContainer>} */}
      </div>
    )
  }
}

MainRight.propTypes = {
  classes: PropTypes.object.isRequired,
}

// export default withStyles(styles)(MainRight);

export default compose(
  withRouter,
  withStyles(styles)
  // graphql(CategoriesQuery)
)(MainRight)
