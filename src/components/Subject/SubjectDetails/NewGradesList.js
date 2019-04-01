import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TextField,
  Typography,
  withStyles,
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

const NewGradesList = props => {
  const { classes, headTitle, studentsData, onEvaluationChange } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.title} component="span">
        Notas da prova
      </Typography>
      {studentsData.length > 0 && (
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
            {studentsData.map(student => (
              <TableRow key={student.id}>
                <TableCell className={classes.middleColumns}>{student.username}</TableCell>
                <TableCell>
                  <TextField
                    id={`new-evaluation-result-field__${student.id}`}
                    value={student.result}
                    onChange={e => onEvaluationChange(e.target.value, student.id)}
                    error={student.error}
                    type="number"
                    helperText={student.error && 'A nota deve ser um valor entre 0 e 10.'}
                    margin="normal"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {studentsData.length === 0 && (
        <Typography className={classes.emptyView} variant="subtitle1">
          Essa disciplina não possue {headTitle.toLowerCase()}
        </Typography>
      )}
    </div>
  );
};

NewGradesList.propTypes = {
  classes: PropTypes.object.isRequired,
  headTitle: PropTypes.string.isRequired,
  onEvaluationChange: PropTypes.func.isRequired,
  studentsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      result: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      username: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

function mapDispatchToProps() {
  return {};
}

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(NewGradesList));
