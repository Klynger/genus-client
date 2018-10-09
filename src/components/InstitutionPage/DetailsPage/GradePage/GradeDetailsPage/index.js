import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubjectGrid from './SubjectGrid';
import { Fade } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fetchGrade } from '../../../../../actions/grade';
import { ResponsiveTitle } from '../../../../utils/SharedComponents';

const styles = theme => ({
  emptyGradeDetails: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.unit,
    width: `calc(100% - ${theme.spacing.unit * 2}px)`,
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit,
    width: `calc(100% - ${theme.spacing.unit * 2}px)`,
  },
});

class GradeDetailsPage extends Component {
  componentDidMount() {
    const { fetchGradeById, match } = this.props;
    fetchGradeById(match.params.gradeId)
      .then(() => {
        // TODO
      })
      .catch(() => {
        // TODO
      });
  }

  render() {
    const {
      grade,
      classes,
      match: { params: { gradeId } },
    } = this.props;

    let toRender;
    if (grade) {
      toRender = (
        <div className={classes.container}>
          <ResponsiveTitle>{grade.name}</ResponsiveTitle>
          <SubjectGrid gradeId={gradeId} />
        </div>
      );
    } else {
      toRender = (
        <div className={classes.emptyGradeDetails}>
          Não encontramos a série desejada
        </div>
      );
    }
    return (
      <Fade in>
        {toRender}
      </Fade>
    );
  }
}

GradeDetailsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchGradeById: PropTypes.func.isRequired,
  grade: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      gradeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function mapToProps({ grade, subject }, ownProps) {
  const { match: { params: { gradeId } } } = ownProps;

  if (grade.byId[gradeId]) {
    const propGrade = grade.byId[gradeId];
    return {
      grade: {
        ...propGrade,
        subjects: propGrade.subjects.map(subId => subject.byId[subId]),
      },
    };
  }
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGradeById: id => dispatch(fetchGrade(id)),
  };
}


export default withStyles(styles)(
  connect(mapToProps, mapDispatchToProps)(GradeDetailsPage));
