import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Table from "material-ui/Table/Table"
import TableBody from "material-ui/Table/TableBody"
import TableCell from "material-ui/Table/TableCell"
import TableHead from "material-ui/Table/TableHead"
import TablePagination from "material-ui/Table/TablePagination"
import TableRow from "material-ui/Table/TableRow"
import TableSortLabel from "material-ui/Table/TableSortLabel"
import Toolbar from "material-ui/Toolbar"
import Typography from "material-ui/Typography"
import Paper from "material-ui/Paper"
import Checkbox from "material-ui/Checkbox"
import IconButton from "material-ui/IconButton"
import Tooltip from "material-ui/Tooltip"
import DeleteIcon from "material-ui-icons/Delete"
import FilterListIcon from "material-ui-icons/FilterList"
import { lighten } from "material-ui/styles/colorManipulator"
import CheckBoxSelection from "./Inputs/CheckBoxSelection"
import DialogPopup from "./DialogPopup"

let counter = 0
// function createData(name, calories, fat, carbs, protein) {
//   counter += 1
//   return { id: counter, name, calories, fat, carbs, protein }
// }
function createData({ ID, Name, Description, Created, LastEdited }) {
  counter += 1
  return { id: counter, ID, Name, Description, Created, LastEdited }
}

/**
 * Need to also sort by dates. Pull in Moment for this.
 * also extract most of this functionality to props.
 * 1. const rows can pe passed to it surely.
 * 2. <TableCell>{n.Description}</TableCell> should loop over the fields. Do it all by config
 * and get all the places
 */

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy)
}

const rowsOld = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  { id: "calories", numeric: true, disablePadding: false, label: "Calories" },
  { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
  { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" },
]

// const COLUMN_HEADERS = [
//   {
//     id: "Name",
//     numeric: false,
//     disablePadding: true,
//     label: "Name",
//     show: true,
//   },
//   {
//     id: "Description",
//     numeric: false,
//     disablePadding: false,
//     label: "Description",
//     show: false,
//   },
//   {
//     id: "Created",
//     numeric: false,
//     disablePadding: false,
//     label: "created",
//     show: true,
//   },
//   {
//     id: "LastEdited",
//     numeric: false,
//     disablePadding: false,
//     label: "last edited",
//     show: false,
//   },
//   // { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
//   // { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" },
// ]

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      columnHeaders,
    } = this.props

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnHeaders.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}>
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}>
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
})

const FilterBar = props => {
  return (
    <div>
      <h3>Here is the Filter Bar</h3>
      <CheckBoxSelection
        options={props.columnHeaders}
        handleOptionChange={optionObj => {
          console.log("Notes Table implement: ", optionObj)
          props.updateShowProp(optionObj)
        }}
      />
    </div>
  )
}

let EnhancedTableToolbar = props => {
  const { numSelected, classes, columnHeaders, title } = props

  return (
    <div>
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}>
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title" id="tableTitle">
              {title}
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
      <Toolbar>
        <FilterBar
          columnHeaders={columnHeaders}
          updateShowProp={prop => props.updateShowProp(prop)}
        />
      </Toolbar>
    </div>
  )
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
}

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    // minWidth: 1020,
    minWidth: "100%",
  },
  tableWrapper: {
    overflowX: "auto",
  },
})

const CellContent = ({ content, limitChar }) => {
  if (limitChar) {
    const trimmedString =
      content.length > limitChar ? (
        <div>
          {content.substring(0, limitChar - 3)}
          <DialogPopup text={"..."} content={content} />
        </div>
      ) : (
        content
      )
    return trimmedString
  }

  return content
}

class NotesTable extends React.Component {
  constructor(props) {
    super(props)

    const propColumnHeaders = this.props.columnHeaders

    const notesData = this.props.notes.map(note => createData(note))
    const displayColumns = propColumnHeaders.reduce(
      (ac, column) => ({ ...ac, [column.id]: column.show }),
      {}
    )

    console.log("notesData ", notesData)

    this.state = {
      order: "asc",
      orderBy: "calories",
      selected: [],
      filterProps: [...displayColumns], // Ok when we click on filter Icon the FilterBar will update the state here
      data: notesData,
      columnHeaders: propColumnHeaders,
      // data: [
      //   createData("Cupcake", 305, 3.7, 67, 4.3),
      //   createData("Donut", 452, 25.0, 51, 4.9),
      //   createData("Eclair", 262, 16.0, 24, 6.0),
      //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      //   createData("Gingerbread", 356, 16.0, 49, 3.9),
      //   createData("Honeycomb", 408, 3.2, 87, 6.5),
      //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
      //   createData("Jelly Bean", 375, 0.0, 94, 0.0),
      //   createData("KitKat", 518, 26.0, 65, 7.0),
      //   createData("Lollipop", 392, 0.2, 98, 0.0),
      //   createData("Marshmallow", 318, 0, 81, 2.0),
      //   createData("Nougat", 360, 19.0, 9, 37.0),
      //   createData("Oreo", 437, 18.0, 63, 4.0),
      // ],
      page: 0,
      rowsPerPage: 5,
    }
    console.log("NotesTable STATE ", this.state)
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = "desc"

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc"
    }

    this.setState({ order, orderBy })
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }))
      return
    }
    this.setState({ selected: [] })
  }

  handleClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    this.setState({ selected: newSelected })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  updateShowProp = prop => {
    const objectKey = Object.keys(prop).map(key => key)[0]
    const objectValue = Object.values(prop).map(val => val)[0]
    let columnHeaders = this.state.columnHeaders
    const headerIndex = columnHeaders.findIndex(function(c) {
      return c.id === objectKey
    })
    let columnHeaderData = columnHeaders[headerIndex]
    columnHeaderData.show = objectValue
    columnHeaders.splice(headerIndex, 1, columnHeaderData)
    this.setState({
      columnHeaders: columnHeaders,
    })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const { classes, title } = this.props
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          title={title}
          numSelected={selected.length}
          columnHeaders={this.state.columnHeaders}
          updateShowProp={prop => {
            console.log("ok we made it here. very ugly ", prop)
            this.updateShowProp(prop)
          }}
        />

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              columnHeaders={this.state.columnHeaders.filter(
                header => header.show === true
              )}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id)
                  return (
                    <TableRow
                      hover
                      // onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          color="primary"
                          onClick={event => this.handleClick(event, n.id)}
                        />
                      </TableCell>

                      {this.state.columnHeaders
                        .filter(header => header.show === true)
                        .map((cellHeader, idx) => {
                          console.group("cellHeader Group")
                          console.log("cellHeader ", cellHeader)
                          console.log("n? ", n)
                          console.groupEnd()
                          return (
                            <TableCell
                              numeric={cellHeader.numeric}
                              style={{ minWidth: "90px" }}
                              component={cellHeader.tableRenderKey}
                              padding={idx === 0 ? "dense" : "dense"}
                              {...cellHeader.tableRenderProps}>
                              <CellContent
                                content={n[cellHeader.id]}
                                limitChar={cellHeader.limitChar}
                              />
                              {/* {cellHeader.limitChar
                                ? n[cellHeader.id].substring(
                                    0,
                                    cellHeader.limitChar
                                  )
                                : n[cellHeader.id]}
                              {n[cellHeader.id]} */}
                            </TableCell>
                          )
                        })}

                      {/* <TableCell component="th" scope="row" padding="none">
                        {n.Name}
                      </TableCell>
                      <TableCell>{n.Description}</TableCell>
                      <TableCell>{n.Created}</TableCell>
                      <TableCell>{n.LastEdited}</TableCell> */}
                      {/* <TableCell numeric>{n.Description}</TableCell> */}
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}

NotesTable.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NotesTable)
