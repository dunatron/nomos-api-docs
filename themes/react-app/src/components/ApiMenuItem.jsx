import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { gql, compose, graphql, withApollo } from "react-apollo/index";
import { connect } from "react-redux";
import { setCurrentMethod } from '../actions/codeExamplesActions';
import {withRouter} from 'react-router'



export const GET_SINGLE_API_METHOD = gql`
query getSingleMethod($ID:ID!) {
  getSingleMethod(ID: $ID){
    ID
    Name
    Description
    HttpRequest
    PermittedCall
    CodeExamples{
      ID
      LanguageName
      CodeSample
    }
    QueryParams {
      Parameter
      Description
    }
  }
}
`

const styles = theme => ({
  paper: {
    'height': 'auto',
    'width': 'auto',
    'margin': '1.2em',
    'padding': '1.2em',
    'text-align': 'center',
    'display': 'inline-block',
  },
  list: {
    color: theme.palette.primary.main
  }
});

class ApiMenuItem extends Component {

  state = {};

  render() {

    const { classes, methodList } = this.props;

    return (
      <List className={classes.list}>
        {methodList.edges.map((d, i) =>
          <ListItem
            key={i}
            dense={true}
            button
            onClick={() => this.handleClick(d, i)}
            className={classes.listItem}
          >
            <ListItemText primary={d.node.Name} />
          </ListItem>
        )}
      </List>
    );
  }

  handleClick = (d, i) => {
    this.fetchApiMethod(d.node.ID)
  }

  fetchApiMethod = async (ID) => {
    await this.props.client.query({
      query: GET_SINGLE_API_METHOD,
      variables: {
        ID: ID,
      }
    })
      .then((res) => {
        const method = res.data.getSingleMethod[0]
        // This is sent to redux and deconstructed as store object there
        // const { ID, Name, Description, HttpRequest, PermittedCall, CodeExamples, QueryParams } = method
        this.props.setCurrentMethod(method)
      })
      .then(() => {
        this.props.history.push('/')
      })
  }

}

const reduxWrapper = connect(
  state => ({
    // tags: state.tags
  }),
  dispatch => ({
    setCurrentMethod: (method) => dispatch(setCurrentMethod(method))
  })
);

export default compose(
  withRouter,
  withStyles(styles),
  withApollo,
  reduxWrapper,
)(ApiMenuItem);