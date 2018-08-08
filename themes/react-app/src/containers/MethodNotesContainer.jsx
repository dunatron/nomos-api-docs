import React, { Component } from "react"
import { withStyles } from "material-ui/styles"
import List, { ListItem, ListItemText } from "material-ui/List"
import { gql, compose, graphql, withApollo } from "react-apollo/index"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import Loader from "../components/Loader"
import EnhancedTable from "../components/EnhancedTable"

export const GET_METHOD_NOTES = gql`
  query getMethodNotes($ID: ID!) {
    getSingleMethod(ID: $ID) {
      ID
      Name
      Description
      MethodNotes {
        Name
        Description
      }
    }
  }
`
/**
 * NOTES: Whenever the methodID changes you can have it so the component does another
 * query. Props a good thing even if we do the below route... do both
 * Make this part of a container that cou can only get to by a route. methodID/13
 */
class MethodNotesContainer extends Component {
  render() {
    const {
      classes,
      methodList,
      getMethodNotes: { error, loading, getSingleMethod },
    } = this.props

    console.log("getMethodNotes ", this.props.getMethodNotes)

    if (loading) {
      return <Loader loadingText={"Loading Method Notes"} />
    }

    if (error) {
      alert(error)
    }

    const Method = getSingleMethod[0]
    console.log("Method ", Method)
    const { ID, Name, Description, MethodNotes } = Method

    const columnData = [
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Note Name",
      },
      {
        id: "calories",
        numeric: true,
        disablePadding: false,
        label: "Note Description",
      },
      { id: "fat", numeric: true, disablePadding: false, label: "created" },
      { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
      {
        id: "protein",
        numeric: true,
        disablePadding: false,
        label: "Protein (g)",
      },
    ]

    return (
      <div>
        <h2>Notes For : {Name}</h2>

        {MethodNotes &&
          MethodNotes.map(({ Name, Description }) => {
            return <div>Note: {Name}</div>
          })}

        <h2>Make this table take key values.</h2>
        <p>
          Probably actually pass the headers and content in through the
          containers..
        </p>
        <p>
          the other option is to render key value pairs and for a object value
          you could display a json string. Or drill into it{" "}
        </p>
        <EnhancedTable columnData={columnData} rowData={MethodNotes} />
      </div>
    )
  }

  handleClick = (d, i) => {
    this.fetchApiMethod(d.node.ID)
  }
}

const reduxWrapper = connect(
  state => ({
    methodID: state.codeExamples.ID,
  }),
  dispatch => ({
    setCurrentMethod: method => dispatch(setCurrentMethod(method)),
  })
)

export default compose(
  withRouter,
  withApollo,
  reduxWrapper,
  graphql(GET_METHOD_NOTES, {
    name: "getMethodNotes",
    options: props => ({ variables: { ID: props.methodID || null } }),
    //options: props => ({ variables: { ID: 3 } }),
  })
)(MethodNotesContainer)
