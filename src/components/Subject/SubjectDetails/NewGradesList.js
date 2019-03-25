import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  TextField,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
    borderRadius: 0,
  },
  table: {
    width: '100%',
    minWidth: 100,
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

const EditableTableCell = ({ row, fieldName, onCellValueChange }) => {
  const handleChange = e => {
    onCellValueChange({
      fieldValue: e.target.value,
      fieldName,
    });
  };

  return (
    <TableCell>
      <TextField
        onChange={handleChange}
        id={fieldName}
        defaultValue={row[fieldName]}
        margin="normal"
      />
    </TableCell>
  );
};

class NewGradesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
    };
  }

  handleChangeOnGrades = (_, change) => {
    const value = change.fieldValue;
    if (!Number.isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 10) {
      // TODO: update state.
    } else {
      // TODO: show error message.
    }
  };

  render() {
    const { classes, headTitle, users } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography className={classes.title} component="span">
          Notas da prova
        </Typography>
        {users.length > 0 && (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell variant="head" className={classes.middleColumns}>
                  Nome
                </TableCell>
                <TableCell variant="head" className={classes.middleColumns}>
                  Nota
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                // change key
                <TableRow key={user.username}>
                  <TableCell className={classes.middleColumns}>{user.username}</TableCell>
                  <EditableTableCell
                    className={classes.middleColumns}
                    row={user}
                    fieldName="nota"
                    onCellValueChange={this.handleChangeOnGrades.bind(this, index)}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {users.length === 0 && (
          <Typography className={classes.emptyView} variant="subtitle1">
            A instituição não possui {headTitle.toLowerCase()}
          </Typography>
        )}
      </Paper>
    );
  }
}

NewGradesList.defaultProps = {
  users: [],
};

NewGradesList.propTypes = {
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

export default connect(mapStateToProps)(withStyles(styles)(NewGradesList));
