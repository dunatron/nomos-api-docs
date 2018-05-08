import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Loader extends React.Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer;

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed === 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes, loadingText, size, fontSize } = this.props;
    return (
      <div>
        <CircularProgress
          className={classes.progress}
          color="secondary"
          variant="determinate"
          size={size ? size : 50}
          value={this.state.completed}
        />
        <p style={{fontSize: `${fontSize ? fontSize : 18}px`}}>{loadingText ? loadingText : 'loading...'}</p>
      </div>
    );
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
  loadingText: PropTypes.string,
  size: PropTypes.number, 
  fontSize: PropTypes.number
};

export default withStyles(styles)(Loader);
