import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { gql, compose, graphql, withApollo } from "react-apollo/index";
import { connect } from "react-redux";
import {setCodeExamples} from '../actions/codeExamplesActions';




export const GET_SINGLE_API_METHOD = gql`
query getSingleMethod($ID:ID!) {
  getSingleMethod(ID: $ID){
    ID
    Name
    CodeExamples{
      ID
      Title
      CodeSample
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

    console.log('method list has made it ', methodList)

    //const methodList = this.props.categories;

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
    console.log("i ", i)
    console.log("d ", d)
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
        console.log("res ", res)
        const method = res.data.getSingleMethod[0]
        const {ID, Name, CodeExamples} = method
        console.log("ID ", ID)
        console.log("Name ", Name)
        console.log("code examples ", CodeExamples)
        // ToDo: create redux reducer and actions to store the code examples
        // The code examples will then be fed into the Tabs
        this.props.setCodeExamples(CodeExamples)
      })
  }

}

const reduxWrapper = connect(
  state => ({
    // tags: state.tags
  }),
  dispatch => ({
    setCodeExamples: (codes) => dispatch(setCodeExamples(codes)),
  })
);

export default compose(
  withStyles(styles),
  withApollo,
  reduxWrapper,
)(ApiMenuItem);