import React, { Component, Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  root: {

  },
});

class AddQueryParam extends Component {

  state = {
    paramName: '',
    paramDescription: ''
  };

  render() {
    const { classes, } = this.props

    return (
      <div className={classes.root}>
        <TextField
          id="paramName"
          label="paramName"
          className={classes.textField}
          value={this.state.paramName}
          onChange={this.handleChange('paramName')}
          margin="normal"
        />
        <TextField
          id="paramDescription"
          label="paramDescription"
          className={classes.textField}
          value={this.state.paramDescription}
          onChange={this.handleChange('paramDescription')}
          margin="normal"
        />
        <IconButton className={classes.button} aria-label="Add Param" color="primary" onClick={() =>
          this._addParam()}>
          <AddIcon />
        </IconButton>
      </div>
    )
  }

  _addParam = async () => {
    await this.props.addParam(this.state)
    this._clearState()
  }

  _clearState = () => {
    this.setState({
      paramName: '',
      paramDescription: ''
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

}



export default withStyles(styles)(AddQueryParam);