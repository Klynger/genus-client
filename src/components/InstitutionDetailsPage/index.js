import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell,
  TableHead, TableRow, Paper,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overFlowX: 'auto',
    width: '75%',
  },
  table: {
    minWidth: 700,
  },
  emptyView: {
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center',
    width: '100%',
  },
});

const InstitutionDetailsPage = ({ classes, institutions }) => (
  <Fragment>
    {institutions.length > 0 ?
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {institutions.map(institution => {
              return (
                <TableRow key={institution.id}>
                  <TableCell component="th" scope="institution">
                    {institution.name}
                  </TableCell>
                  <TableCell>{institution.email}</TableCell>
                  <TableCell>{institution.address}</TableCell>
                  <TableCell>{institution.phone}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper> :
      <div className={classes.emptyView}>
        You are not associated with any institutions
      </div>}
  </Fragment>
);

InstitutionDetailsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  institutions: PropTypes.array,
};

InstitutionDetailsPage.defaultProps = {
  institutions: [],
};

function mapStateToProps({ institution }) {
  const institutions = institution.allIds.map(id => institution.byId[id]);
  return {
    institutions,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(InstitutionDetailsPage));
