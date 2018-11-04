import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DeleteForever } from '@material-ui/icons';
import RemoveUserDialog from './RemoveUserDialog';
import { NO_INSTUTION_SELECTED } from '../../../reducers/institution';

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
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
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
    const { page, openDialog, rowsPerPage, userId } = this.state;

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
                  email
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
