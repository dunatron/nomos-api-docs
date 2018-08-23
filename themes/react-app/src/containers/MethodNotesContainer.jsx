import React, { Component } from "react"
import { gql, compose, graphql, withApollo } from "react-apollo/index"
import { withRouter } from "react-router"
import Loader from "../components/Loader"
import NotesTable from "../components/NotesTable"

export const GET_METHOD_NOTES = gql`
  query getMethodNotes($ID: ID!) {
    getSingleMethod(ID: $ID) {
      ID
      Name
      Description
      MethodNotes {
        ID
        Name
        Description
        Created
        LastEdited
      }
    }
  }
`
const COLUMN_HEADERS = [
  {
    id: "Name",
    numeric: false,
    disablePadding: true,
    label: "Name",
    show: true,
    tableRenderKey: "th",
  },
  {
    id: "Description",
    numeric: false,
    disablePadding: false,
    label: "Description",
    show: false,
    tableRenderKey: "td",
    limitChar: 120,
    tableRenderProps: {
      style: {
        minWidth: "220px",
        color: "#004851",
      },
    },
  },
  {
    id: "Created",
    numeric: false,
    disablePadding: false,
    label: "created",
    show: false,
    tableRenderKey: "td",
  },
  {
    id: "LastEdited",
    numeric: false,
    disablePadding: false,
    label: "last edited",
    show: false,
    tableRenderKey: "td",
  },
  // { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
  // { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" },
]
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

    console.log("MethodNotesContainer props ", this.props)
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

    return (
      <div>
        {MethodNotes &&
          MethodNotes.map((Note, idx) => {
            return <div key={idx}>{Note.Description}</div>
          })}
        {MethodNotes && (
          <NotesTable
            notes={MethodNotes}
            columnHeaders={COLUMN_HEADERS}
            title={`${Name} Notes`}
          />
        )}
      </div>
    )
  }

  handleClick = (d, i) => {
    this.fetchApiMethod(d.node.ID)
  }
}

export default compose(
  withRouter,
  withApollo,
  graphql(GET_METHOD_NOTES, {
    name: "getMethodNotes",
    options: props => ({ variables: { ID: props.methodID || null } }),
    // options: props => ({ variables: { ID: 3 } }),
  })
)(MethodNotesContainer)
