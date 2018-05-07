import React from 'react';
import { render } from 'react-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { compose, gql, graphql } from "react-apollo/index";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { setStyle, toggleShowLineNumbers, setFontSize } from "../actions/highlightCodeActions";
import { withStyles } from "material-ui/styles/index";
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import { bindActionCreators } from "redux";


import * as HighlightStyles from 'react-syntax-highlighter/dist/styles/hljs'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

const availableStyles = [
  'agate',
  'androidstudio',
  'arduino-light',
  'arta',
  'ascetic',
  'atelier-cave-dark',
  'atelier-cave-light',
  'atelier-dune-dark',
  'atelier-dune-light',
  'atelier-estuary-dark',
  'atelier-estuary-light',
  'atelier-forest-dark',
  'atelier-forest-light',
  'atelier-heath-dark',
  'atelier-heath-light',
  'atelier-lakeside-dark',
  'atelier-lakeside-light',
  'atelier-plateau-dark',
  'atelier-plateau-light',
  'atelier-savanna-dark',
  'atelier-savanna-light',
  'atelier-seaside-dark',
  'atelier-seaside-light',
  'atelier-sulphurpool-dark',
  'atelier-sulphurpool-light',
  'brown-paper',
  'codepen-embed',
  'color-brewer',
  'dark',
  'darkula',
  'defaultStyle',
  'docco',
  'far',
  'foundation',
  'github-gist',
  'github',
  'googlecode',
  'grayscale',
  'hopscotch',
  'hybrid',
  'idea',
  'ir-black',
  'kimbie.dark',
  'kimbie.light',
  'magula',
  'mono-blue',
  'monokai-sublime',
  'monokai',
  'obsidian',
  'paraiso-dark',
  'paraiso-light',
  'pojoaque',
  'railscasts',
  'rainbow',
  'school-book',
  'solarized-dark',
  'solarized-light',
  'sunburst',
  'tomorrow-night-blue',
  'tomorrow-night-bright',
  'tomorrow-night-eighties',
  'tomorrow-night',
  'tomorrow',
  'vs',
  'xcode',
  'xt256',
  'zenburn'
];
class CodeHighlighterSettings extends React.Component {

  render() {
    const { selectedStyle, style, setStyle, showLineNumbers, toggleShowLineNumbers, classes, fontSize, setFontSize } = this.props;

    return (
      <div>
        <TextField
          id="select-currency"
          select
          label="Select"
          className={classes.textField}
          value={selectedStyle}
          // onChange={(e) => this.props.dispatch(setStyle(e.target.value, require(`../../node_modules/react-syntax-highlighter/dist/styles/hljs/${e.target.value}`).default))}
          onChange={(e) => setStyle(e.target.value, require(`../../node_modules/react-syntax-highlighter/dist/styles/hljs/${e.target.value}`).default)}
          helperText="select code highlight style"
          margin="normal"
        >
          {availableStyles.map(s => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          className={classes.textField}
          label="Font Size"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          type="number"
        ></TextField>

        <div style={{ paddingTop: '10px', fontSize: 16, color: 'aliceblue' }}>
          <label htmlFor="showLineNumbers">Show Line Numbers:</label>
          <input
            type="checkbox"
            checked={showLineNumbers}
            onChange={() => toggleShowLineNumbers(!showLineNumbers)}
            id="showLineNumbers"
          />
        </div>
      </div>
    );
  }
}

// Connect redux to our component

const reduxWrapper = connect(
  state => ({
    selectedStyle: state.higlightStyle.selected,
    style: state.higlightStyle.style,
    showLineNumbers: state.higlightStyle.showLineNumbers,
    fontSize: state.higlightStyle.fontSize
  }),
  dispatch => ({
    setStyle: (selected, style) => dispatch(setStyle(selected, style)),
    setFontSize: (fs) => dispatch(setFontSize(fs)),
    toggleShowLineNumbers: (showLineNumbers) => dispatch(toggleShowLineNumbers(showLineNumbers))
  })
);
export default compose(
  reduxWrapper,
  withStyles(styles)
)(CodeHighlighterSettings);