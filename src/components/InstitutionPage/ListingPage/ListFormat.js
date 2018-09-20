import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Table, TableBody, TableCell,
  TableHead, TableRow, Paper,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  row: {
    cursor: 'pointer',
  },
  table: {
    borderCollapse: 'separate',
    borderSpacing: '0 1em',
    maxWidth: 700,
  },
  tableWrapper: {
    paddingLeft: 5,
    paddingRight: 5,
    overflowX: 'auto',
    [theme.breakpoints.down('lg')]: {
      width: '70%',
    },
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('md')]: {
      width: '98%',
    },
  },
  tableCell: {
    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
  },
});

function PaperRow(props) {
  return <Paper component="tr" {...props} />;
}

const ListFormat = ({ classes, history, institutions }) => (
  <div className={classes.tableWrapper}>
    <Table className={classes.table} align="center">
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Número</TableCell>
        </TableRow>
      </TableHead>
      <TableBody align="center">
        {institutions.map(institution => {
          return (
            <TableRow
              hover
              key={institution.id}
              component={PaperRow}
              className={classes.row}
              onClick={() => history.push(`${history.location.pathname}/details/${institution.id}`)}
            >
              <TableCell className={classes.tableCell} component="th" scope="row">
                {institution.name}
              </TableCell>
              <TableCell className={classes.tableCell}>{institution.email}</TableCell>
              <TableCell className={classes.tableCell}>{institution.phone}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </div>
);

ListFormat.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  institutions: PropTypes.array.isRequired,
};

export default withRouter(withStyles(styles)(ListFormat));
