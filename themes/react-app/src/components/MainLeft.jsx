import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: "auto",
    flexBasis: 0,
    minWidth: "50%",
    backgroundColor: theme.palette.background.paper,
    // height: `calc(100vh - ${theme.spacing.unit * 6}px)`,
    height: '100vh',
    textAlign: 'left'
  },
});

class MainLeft extends React.Component {
  state = {};

  render() {
    const { classes, Name, Description, HttpRequest, PermittedCall, QueryParams } = this.props;

    return (
      <Paper className={classes.root}>
        {/* Title */}
        <Typography paragraph variant="title">
          {Name}
        </Typography>
        {/* Description */}
        <Typography paragraph variant="body1">
          {Description}
        </Typography>
        {/* HttpRequest */}
        <Typography paragraph variant="subheading">
          HTTP Request
        </Typography>
        <Typography paragraph variant="body1">
          {HttpRequest}
        </Typography>
        {/* PermittedCall */}
        <Typography paragraph variant="subheading">
          Users permitted to call
        </Typography>
        <Typography paragraph variant="body1">
          {PermittedCall}
        </Typography>
        {/* QueryParams */}
        <Typography paragraph variant="subheading">
          Query Parameters
        </Typography>
        {QueryParams && this.generateQueryParamsList(QueryParams)}
      </Paper>
    );
  }

  generateQueryParamsList = (params) => {
    const { classes } = this.props;
    const ParamsList = params.map((d, i) => {
      return (
        <TableRow key={i}>
          <TableCell>{d.Parameter}</TableCell>
          <TableCell>{d.Description}</TableCell>
        </TableRow>
      );
    })
    return <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Parameter</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ParamsList}
      </TableBody>
    </Table>
  }
}

MainLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLeft);