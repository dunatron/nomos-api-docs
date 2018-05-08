import React, { Component } from 'react';
import logo from './img/logo.svg';
import './App.css';
import WebpackLogo from './img/webpack.svg';
import SSLogo from './img/silverstripe-logo.png';
import EventList from './pages/EventList';
import { withStyles } from 'material-ui/styles';

// containers
import {compose} from 'react-apollo';
import ApiCategoriesList from './containers/ApiCategoriesList'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import {withRouter} from 'react-router'

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

const history = createBrowserHistory()

class App extends Component {
  render() {

    const { classes } = this.props;
    return (
      <BrowserRouter history={history}>
      <div className="App">
        <ApiCategoriesList />
      </div>
      </BrowserRouter>
    )
  }
}

// export default App;
export default withStyles(styles)(App)

// export default withRouter(compose(
//   withStyles(styles)
// )(App));
