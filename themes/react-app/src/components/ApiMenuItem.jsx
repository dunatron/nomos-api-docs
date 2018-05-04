import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { gql, compose, graphql, withApollo } from "react-apollo/index";
import { connect } from "react-redux";


export const GET_SINGLE_API_METHOD = gql`
query getSingleApiMethod($ID:ID!) {
  getSingleApiMethod(ID: $ID){
    ID
    Title
    CodeExamples{
      edges {
        node {
          ID
          Title
          CodeSample
        }
      }
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
            <ListItemText primary={d.node.Title} />
          </ListItem>
        )}
      </List>
    );
  }

  handleClick = (d, i) => {
    console.log("i ", i)
    console.log("d ", d)

  }

  fetchApiMethod = async () => {
    await this.props.client.query({
      query: GET_SINGLE_API_METHOD,
      variables: {
        ID: 1,
      }
    })
      .then((res) => {
        console.log("res ", res)
      })
  }

}

const reduxWrapper = connect(
  state => ({
    // tags: state.tags
  })
);

export default compose(
  withStyles(styles),
  withApollo,
  reduxWrapper,
)(ApiMenuItem);