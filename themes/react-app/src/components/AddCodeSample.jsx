import React, { Component, Fragment } from 'react';
import { graphql, gql, compose, withApollo } from 'react-apollo'
import { withStyles } from 'material-ui/styles';
import { connect } from "react-redux";
import Button from 'material-ui/Button';
import BackButton from './BackButton';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { ALL_API_CATEGORIES_WITH_DATA } from '../containers/ApiCategoriesList'
import Loader from './Loader';
import SyntaxHighlighter from 'react-syntax-highlighter';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    textAlign: 'left'
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    borderRadius: 0
  },
  codeEditor: {
    display: 'flex'
  },
  editorField: {
    flex: '1 1 0'
  },
});

class AddCodeSample extends Component {

  state = {
    LanguageName: "",
    CodeSample: ""
  };

  render() {
    const { classes, fetchLanguages: { readLanguages, loading } } = this.props
    const {LanguageName} = this.state

    if (loading) {
      return <Loader fontSize={18} size={22} loadingText={'fetching language types'} />
    }

    console.log('Fetched langues data ', readLanguages)

    return (
      <div className={classes.root}>
        <BackButton />
        <form className={classes.formContainer} noValidate autoComplete="off" onSubmit={(e) => this.addCategory(e)}>
          {this.selectLanguage(readLanguages)}
          <Button className={classes.button} variant="raised" color="primary" type="submit" onClick={(e) => this._createCategory(e)} >Add Code Sample</Button>
        </form>
        <div className={classes.codeEditor}>
          <SyntaxHighlighter
            className={classes.editorField}
            language={LanguageName.length >=1 ? LanguageName : 'javascript'}
            //style={this.props.style}
            style={{...this.props.style,...{fontSize: `${this.props.fontSize}px`}}}
            showLineNumbers={this.props.showLineNumbers}>
            {this.state.CodeSample}
          </SyntaxHighlighter>
          <TextField
            id="CodeSample"
            style={{fontSize: `${this.props.fontSize}px`}}
            className={classNames(classes.textField, classes.editorField)}
            value={this.state.CodeSample}
            onChange={this.handleChange('CodeSample')}
            label="Code Sample"
            placeholder="Enter your code here"
            multiline
            margin="normal"
          />
        </div>
      </div>
    )
  }

  selectLanguage = (langues) => {
    const { classes } = this.props
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="category">Language</InputLabel>
        <Select
          value={this.state.LanguageName}

          onChange={this.handleChange('LanguageName')}
          inputProps={{
            name: 'LanguageName',
            id: 'LanguageName',
          }}
        >
          {langues.map((d, i) => {
            return <MenuItem value={d.Name}>{d.Name}</MenuItem>
          })}
        </Select>
      </FormControl>
    )
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

}

const reduxWrapper = connect(
  state => ({
    fontSize: state.higlightStyle.fontSize,
    style: state.higlightStyle.style,
    showLineNumbers: state.higlightStyle.showLineNumbers
  })
);

const CREATE_CODE_SAMPLE_MUTATION = gql`
mutation CreateLinkMutation($Name: String) {
  createCategory(Input: {
    Name: $Name
  }) {
    ID,
    Name,
    Methods {
      edges {
        node {
          ID
          Name
        }
      }
    }
  }
}
`;

const FETCH_LANGUAGES = gql`
query readLanguages {
  readLanguages {
    Name
  }
}
`

export default compose(
  graphql(CREATE_CODE_SAMPLE_MUTATION, { name: 'createCodeSampleMutation' }),
  graphql(FETCH_LANGUAGES, { name: 'fetchLanguages' }),
  withRouter,
  withStyles(styles),
  withApollo,
  reduxWrapper,
)(AddCodeSample);