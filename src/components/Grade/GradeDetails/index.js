import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Fade } from '@material-ui/core';
import SubjectsGrid from './SubjectsGrid';
import { fetchGrade } from '../../../actions/grade';
import { withStyles } from '@material-ui/core/styles';
import { ResponsiveTitle } from '../../utils/SharedComponents';
import DefaultContainerRoute from '../../utils/DefaultContainerRoute';

const styles = theme => ({
  emptyGradeDetails: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.unit,
    width: `calc(100% - ${theme.spacing.unit * 2}px)`,
  },
});

class GradeDetails extends Component {
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
      match: {
        params: { gradeId },
      },
      theme: {
        spacing: { unit },
      },
    } = this.props;
    let toRender;
    if (grade) {
      toRender = (
        <DefaultContainerRoute unit={unit}>
          <ResponsiveTitle>{grade.name}</ResponsiveTitle>
          <SubjectsGrid gradeId={gradeId} />
        </DefaultContainerRoute>
      );
    } else {
      toRender = <div className={classes.emptyGradeDetails}>Não encontramos a série desejada</div>;
    }
    return <Fade in>{toRender}</Fade>;
  }
}

GradeDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchGradeById: PropTypes.func.isRequired,
  grade: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      gradeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  theme: PropTypes.shape({
    spacing: PropTypes.shape({
      unit: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

function mapToProps({ grade, subject }, ownProps) {
  const {
    match: {
      params: { gradeId },
    },
  } = ownProps;

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

export default withStyles(styles, { withTheme: true })(
  connect(
    mapToProps,
    mapDispatchToProps,
  )(GradeDetails),
);
