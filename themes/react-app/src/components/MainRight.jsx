import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import CodeSample from './CodeSample';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0, height: `calc(100vh - 48px)` }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    flexBasis: 0,
    minWidth: "50%",
    backgroundColor: theme.palette.background.paper,
    //height: `calc(100vh - ${theme.spacing.unit * 6}px)`,
    height: '100vh',
  },
});

class MainRight extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  generateTabContainers = (CodeExamples) => {
    return CodeExamples.map((data, index) => {
      if (this.state.value === index) {
        return <TabContainer><CodeSample CodeSample={data.CodeSample} /></TabContainer>
      } else {
        return null
      }
    })
  }

  render() {
    const { classes, CodeExamples } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >

            {CodeExamples && CodeExamples.map((d, i) => {
              return <Tab key={i} label={d.Title} />
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


        {this.generateTabContainers(CodeExamples)}

        {/* {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>}
        {value === 4 && <TabContainer>Item Five</TabContainer>}
        {value === 5 && <TabContainer>Item Six</TabContainer>}
        {value === 6 && <TabContainer>Item Seven</TabContainer>} */}
      </div>
    );
  }
}


MainRight.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainRight);