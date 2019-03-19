import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import RemoveUserDialog from './RemoveUserDialog';
import { DeleteForever } from '@material-ui/icons';
import { NO_INSTUTION_SELECTED } from '../../../reducers/institution';
import {
  Paper,
  withStyles,
  Table,
  TableHead,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  IconButton,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
    borderRadius: 0,
  },
  table: {
    width: '100%',
  },
  title: {
    margin: theme.spacing.unit * 3,
  },
  middleColumns: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  deleteIcon: {
    [theme.breakpoints.up('xs')]: {
      marginLeft: 'auto',
      marginRigt: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: theme.spacing.unit * 3,
    },
  },
  emptyView: {
    marginLeft: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
  },
});

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 5,
      openDialog: false,
      userId: '',
      rowsPerPageOptions: [5, 10, 15, 30, 60],
    };
  }

  handleChangePage = (_, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = e => {
    this.setState({ rowsPerPage: e.target.value });
  };

  handleRemoveUserDialogToggle = () => {
    this.setState(prevState => ({ openDialog: !prevState.openDialog, userId: '' }));
  };

  openRemoveUserDialog = userId => {
    if (!this.state.openDialog) {
      this.setState({ userId, openDialog: true });
    }
  };

  render() {
    const { ableToRemove, classes, headTitle, loggedUser, selectedInstitution, users } = this.props;
    const { page, openDialog, rowsPerPage, userId, rowsPerPageOptions } = this.state;

    return (
      <Paper className={classes.root}>
        <Typography className={classes.title} component="span" variant="h6">
          {headTitle}
        </Typography>
        {users.length > 0 && (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell variant="head">Nome</TableCell>
                <TableCell variant="head" className={classes.middleColumns}>
                  Email
                </TableCell>
                <TableCell variant="head" className={classes.deleteIcon}>
                  Remover
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                // change key
                <TableRow key={user.username}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell className={classes.middleColumns}>{user.email}</TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.deleteIcon}
                      onClick={() => this.openRemoveUserDialog(user.id)}
                      disabled={user.id === loggedUser || !ableToRemove}
                    >
                      <DeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {users.length > 0 && (
          <TablePagination
            component="div"
            count={users.length}
            page={page}
            rowsPerPage={rowsPerPage}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            labelRowsPerPage="Linhas por página:"
            rowsPerPageOptions={rowsPerPageOptions}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
          />
        )}
        {users.length === 0 && (
          <Typography className={classes.emptyView} variant="subtitle1">
            A instituição não possui {headTitle.toLowerCase()}
          </Typography>
        )}
        {selectedInstitution !== NO_INSTUTION_SELECTED && (
          <RemoveUserDialog
            onClose={this.handleRemoveUserDialogToggle}
            open={openDialog}
            userId={userId}
          />
        )}
      </Paper>
    );
  }
}

UserList.defaultProps = {
  users: [],
};

UserList.propTypes = {
  ableToRemove: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  headTitle: PropTypes.string.isRequired,
  loggedUser: PropTypes.string.isRequired,
  selectedInstitution: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  ),
};

function mapStateToProps({ institution, user }) {
  const { selectedInstitution } = institution;
  let ableToRemove = false;
  if (institution.byId[selectedInstitution]) {
    ableToRemove = institution.byId[selectedInstitution].admins.includes(user.loggedUserId);
  }
  return {
    ableToRemove,
    loggedUser: user.loggedUserId,
    selectedInstitution,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(UserList));
