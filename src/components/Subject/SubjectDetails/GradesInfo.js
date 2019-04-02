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
    for (let i = 0; i < this.props.studentSubjects.length; i += 1) {
      const userEvaluations = this.props.studentSubjects[i].evaluations;
      for (let j = 0; j < userEvaluations.length; j += 1) {
        const ev = userEvaluations[j];
        evaluations.push({
          name: ev.name,
          weight: ev.weight,
          result: ev.result,
        });
        average += ev.weight * ev.result;
      }
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
              // change key
              <TableRow key={evaluation.name}>
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
  studentSubjects: PropTypes.object.isRequired,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(withStyles(styles)(GradesInfo));
