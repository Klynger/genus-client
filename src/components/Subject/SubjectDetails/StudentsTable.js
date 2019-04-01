import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
  Paper,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  withStyles,
  Typography,
  TablePagination,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  title: {
    margin: theme.spacing.unit * 3,
  },
  table: {
    width: '100%',
  },
  middleColumns: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  emptyView: {
    marginLeft: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
  },
});

class StudentsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 15, 30, 60],
      selectedEvaluation: null,
    };
  }

  handlePageChange = (_, page) => {
    this.setState({ page });
  };

  handleRowsPerPageChange = e => {
    this.setState({ rowsPerPage: e.target.value });
  };

  handleEvaluationClick = evaluation => {
    this.setState({
      openEditEvaluation: true,
      selectedEvaluation: evaluation,
    });
  };

  render() {
    const { classes, userRole, studentsData, evaluationHeaders } = this.props;
    const {
      page,
      rowsPerPage,
      rowsPerPageOptions, // eslint-disable-next-line
      selectedEvaluation, // eslint-disable-next-line
      openEditEvaluation,
    } = this.state;

    return (
      <Paper className={classes.root}>
        <Typography className={classes.title} variant="h6">
          Alunos
        </Typography>
        {studentsData.length > 0 ? (
          <Fragment>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell variant="head">Nome</TableCell>
                  <TableCell variant="head">Email</TableCell>
                  {(userRole === 'TEACHER' || userRole === 'ADMIN') &&
                    evaluationHeaders.map(header => (
                      <TableCell key={header} variant="head" className={classes.middleColumns}>
                        {header}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {studentsData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(student => (
                    <TableRow key={student.id}>
                      <TableCell>{student.username}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      {student.evaluations.map(evaluation => (
                        <TableCell key={evaluation.id}>
                          {userRole === 'TEACHER' ? (
                            <Button onClick={() => this.handleEvaluationClick(evaluation)}>
                              {evaluation.result}
                            </Button>
                          ) : (
                            evaluation.result
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={studentsData.length}
              page={page}
              rowsPerPage={rowsPerPage}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
              labelRowsPerPage="Linhas por página:"
              rowsPerPageOptions={rowsPerPageOptions}
              onChangeRowsPerPage={this.handleRowsPerPageChange}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handlePageChange}
            />
          </Fragment>
        ) : (
          <Typography className={classes.emptyView} variant="subtitle1">
            Não há estudantes
          </Typography>
        )}
      </Paper>
    );
  }
}

StudentsTable.defaultProps = {
  studentsData: [],
  evaluationHeaders: [],
};

StudentsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  evaluationHeaders: PropTypes.arrayOf(PropTypes.string),
  studentsData: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      evaluations: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          result: PropTypes.number.isRequired,
          weight: PropTypes.number.isRequired,
        }),
      ).isRequired,
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  ),
  userRole: PropTypes.string.isRequired,
};

export default withStyles(styles)(StudentsTable);
