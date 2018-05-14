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
import CodeSample from './CodeSample'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    textAlign: 'left',
    width: '100%', 
    boxSizing: 'border-box'
  },
  formContainer: {
    padding: `${theme.spacing.unit * 4}px 0`,
    height: theme.spacing.unit * 6,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  formControl: {
    minWidth: '180px'
  },
  button: {
    borderRadius: 0
  },
  codeEditor: {
    display: 'flex',
    //width: `calc(100% - 241px)`,
    height: `calc(100vh - ${(theme.spacing.unit * 28) + 4}px )`,
    margin: `0 -${theme.spacing.unit * 4}px`
  },
  editorField: {
    //flex: '1 1 0'
    overflowX: 'auto',
    flexBasis: 0,
    flexGrow: 1
  },
});

class AddCodeSample extends Component {

  state = {
    MethodID: "",
    LanguageName: "",
    CodeSample: "",
    adding: false,
    addingText: ''
  };

  render() {
    const { classes, fetchLanguages: { readLanguages, loading }, fontSize, client } = this.props
    const { LanguageName, adding, addingText } = this.state

    const data = client.readQuery({
      query: ALL_API_CATEGORIES_WITH_DATA,
    });

    console.log('Extract methods from this data', data)

    const methodsList = [];

    data.readCategories.edges.map((cat, catIdx) => {
      cat.node.Methods.edges.map((method, methodIdx) => {
        methodsList.push({
          name: method.node.Name,
          id: method.node.ID
        })
      })
    })

    console.log('OUR METHODS LIST ', methodsList)

    if (loading) {
      return <Loader fontSize={18} size={22} loadingText={'fetching language types'} />
    }

    // let editorFieldStyle = { 
    //   fontSize: `${fontSize}px !important`
    // }

    let editorFieldStyle = {
      fontSize: `${fontSize}px`
    }

    return (
      <div className={classes.root}>
        {adding ? <Loader loadingText={addingText}/> :
          <Fragment>
            <BackButton/>
            <form className={classes.formContainer} noValidate autoComplete="off"
                  onSubmit={(e) => this._createCodeSample(e)}>
              {this.selectApiMethod(methodsList)}
              {this.selectLanguage(readLanguages)}
              <Button className={classes.button} variant="raised" color="primary" type="submit"
                      onClick={(e) => this._createCodeSample(e)}>Add Code Sample</Button>
            </form>
            <div className={classes.codeEditor}>
              <CodeSample CodeSample={this.state.CodeSample} language={LanguageName} extraClass={classes.editorField}/>
              <Input
                value={this.state.CodeSample}
                onChange={this.handleChange('CodeSample')}
                placeholder="Enter your code here"
                style={editorFieldStyle}
                multiline
                className={`${classes.input} ${classes.editorField}`}
                inputProps={{
                  'aria-label': 'code-editor',
                }}
              />
            </div>
          </Fragment>
        }
      </div>
    )
  }

  selectApiMethod = (methods) => {
    const { classes } = this.props
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="method">Method</InputLabel>
        <Select
          value={this.state.MethodID}

          onChange={this.handleChange('MethodID')}
          inputProps={{
            name: 'MethodID',
            id: 'MethodID',
          }}
        >
          {methods.map((d, i) => {
            return <MenuItem key={i} value={d.id}>{d.name}</MenuItem>
          })}
        </Select>
      </FormControl>
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
            return <MenuItem key={i} value={d.Name}>{d.Name}</MenuItem>
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

  handleBackAction = () => {
    this.props.history.goBack()
  }

  _createCodeSample = async (e) => {
    e.preventDefault()
    const { LanguageName, CodeSample, MethodID } = this.state;
    this.setState({
      adding: true,
      addingText: `Creating "${LanguageName}" Sample`
    })
    // 1. create new method 
    await this.props.createCodeSampleMutation({
      variables: {
        language: LanguageName,
        code: CodeSample,
        methodID: MethodID
      },
    });
    alert('Make a nicer alert, also f ind what response is sent on success')

    this.handleBackAction()
  }

}

const reduxWrapper = connect(
  state => ({
    fontSize: state.higlightStyle.fontSize,
    style: state.higlightStyle.style,
    showLineNumbers: state.higlightStyle.showLineNumbers
  })
);

const CREATE_CODE_SAMPLE_MUTATION = gql`
mutation CreateCodeSampleMutation($language: String, $code: String, $methodID:ID) {
  createCode_Example(Input: {
    LanguageName: $language, 
    CodeSample: $code, 
    MethodID: $methodID
  }) {
    ID
    LanguageName
    CodeSample
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