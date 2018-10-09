import React, { Component } from 'react';
import {
  Paper, withStyles,
  Table, TableHead,
  Typography, TableRow,
  TableCell, TableBody,
  TablePagination, IconButton,
} from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
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

class EmployeeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 5,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleChangePage(event, page) {
    this.setState({ page });
  }

  render() {
    const { classes, employees, headTitle } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <Paper className={classes.root}>
        <Typography
          className={classes.title}
          variant="title"
        >
          {headTitle}
        </Typography>
        {employees.length > 0 &&
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell variant="head">Nome</TableCell>
                <TableCell variant="head" className={classes.middleColumns}>email</TableCell>
                <TableCell variant="head" className={classes.deleteIcon}>Remover</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(employee => (
                  // change key
                  <TableRow key={employee.username}>
                    <TableCell>
                      {employee.username}
                    </TableCell>
                    <TableCell className={classes.middleColumns}>
                      {employee.email}
                    </TableCell>
                    <TableCell>
                      <IconButton className={classes.deleteIcon}>
                        <DeleteForever />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        }
        {employees.length > 0 &&
          <TablePagination
            component="div"
            count={employees.length}
            page={page}
            rowsPerPage={rowsPerPage}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
          />}
        {employees.length === 0 &&
          <Typography className={classes.emptyView}>
            A instituição não possui {headTitle.toLowerCase()}
          </Typography>
        }
      </Paper>
    );
  }
}

EmployeeList.defaultProps = {
  employees: [],
};

EmployeeList.propTypes = {
  classes: PropTypes.object.isRequired,
  employees: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  })),
  headTitle: PropTypes.string.isRequired,
};

export default withStyles(styles)(EmployeeList);
