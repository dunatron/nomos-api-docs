import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class MainRight extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        Right
      </div>
    );
  }
}

MainRight.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainRight);