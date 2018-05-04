import React, { Component } from 'react';
import logo from './img/logo.svg';
import './App.css';
import WebpackLogo from './img/webpack.svg';
import SSLogo from './img/silverstripe-logo.png';
import EventList from './pages/EventList';
import { withStyles } from 'material-ui/styles';

// containers
import ApiCategoriesList from './containers/ApiCategoriesList'

// Components
import NavDrawer from './components/NavDrawer'

const styles = {
  cardHolder: {
    'display': 'flex',
    'align-items': 'center',
    'overflow': 'auto',
    'box-sizing': 'border-box',
    'width': '100%',
    'justify-content': 'center',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'flex-flow': 'row wrap',
    'align-content': 'flex-end'
  }
};

class App extends Component {
  render() {

    const { classes } = this.props;
    return (
      <div className="App">
        <ApiCategoriesList />
      </div>
    )
  }
}

// export default App;
export default withStyles(styles)(App)
