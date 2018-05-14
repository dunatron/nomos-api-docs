import React, { Component } from 'react';
import {withStyles} from 'material-ui/styles';
import { compose } from "react-apollo/index";
import Button from 'material-ui/Button';
import {withRouter} from 'react-router'

const styles = theme => ({
  button: {
    borderRadius: 0
  }
});

class BackButton extends Component {

  render() {
    const {classes} = this.props
    return <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={() => this.handleBackButton()} >Back</Button>
  }

  handleBackButton = () => {
    this.props.history.goBack()
  }

}

export default compose(
  withRouter,
  withStyles(styles),
)(BackButton);