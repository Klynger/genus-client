import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  withStyles,
  Typography,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
  },
  title: {
    margin: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3,
  },
  ListItem: {
    marginLeft: theme.spacing.unit,
  },
  inline: {
    display: 'inline',
  },
});

class GradesInfo extends Component {
  constructor(props) {
    super(props);
    const result = this.getEvaluations();
    const evaluations = result.evaluations;
    const average = result.average;
    this.state = {
      evaluations,
      average,
    };
  }

  getEvaluations = () => {
    const evaluations = [];
    let average = 0;
    const userEvaluations = this.props.studentSubject.evaluations;
    userEvaluations.forEach(ev => {
      ev.evaluationResults.forEach(result => {
        if (result.user === this.props.studentId) {
          evaluations.push({
            name: ev.name,
            weight: ev.weight,
            result: result.result,
            id: result.id,
          });
          average += ev.weight * result.result;
        }
      });
    });

    if (userEvaluations.length > 0) {
      average /= userEvaluations.length;
    }
    return { evaluations, average };
  };

  render() {
    const { classes } = this.props;
    const { evaluations, average } = this.state;

    return (
      <Paper className={classes.root}>
        <Typography className={classes.title} component="span" variant="h6">
          Notas
        </Typography>
        <List className={classes.root}>
          <ListItem alignItems="flex-start" className={classes.ListItem}>
            <ListItemText primary={`Média: ${average}`} />
          </ListItem>
        </List>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell variant="head" className={classes.middleColumns}>
                Avaliação
              </TableCell>
              <TableCell variant="head" className={classes.middleColumns}>
                Nota
              </TableCell>
              <TableCell variant="head" className={classes.middleColumns}>
                Peso
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluations.map(evaluation => (
              <TableRow key={evaluation.id}>
                <TableCell className={classes.middleColumns}>{evaluation.name}</TableCell>
                <TableCell className={classes.middleColumns}>{evaluation.result}</TableCell>
                <TableCell className={classes.middleColumns}>{evaluation.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

GradesInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  studentId: PropTypes.string.isRequired,
  studentSubject: PropTypes.object.isRequired,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(withStyles(styles)(GradesInfo));
