import PropTypes from 'prop-types';
import GradeInfo from './GradeInfo';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Fade } from '@material-ui/core';
import SubjectsGrid from './SubjectsGrid';
import { fetchGrade } from '../../../actions/grade';
import { withStyles } from '@material-ui/core/styles';
import AddStudentToGradeDialog from './AddStudentToGradeDialog';
import DefaultContainerRoute from '../../shared/DefaultContainerRoute';

const styles = theme => ({
  emptyGradeDetails: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.unit,
    width: `calc(100% - ${theme.spacing.unit * 2}px)`,
  },
});

class GradeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addStudentsOpen: false,
    };
  }

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

  handleAddStudentsOpen = () => {
    this.setState({ addStudentsOpen: true });
  };

  handleAddStudentsClose = () => {
    this.setState({ addStudentsOpen: false });
  };

  render() {
    const { classes, grade } = this.props;
    let toRender;
    if (grade) {
      const {
        students,
        match: {
          params: { gradeId },
        },
      } = this.props;
      const { addStudentsOpen } = this.state;

      toRender = (
        <DefaultContainerRoute>
          <AddStudentToGradeDialog
            grade={grade}
            students={students}
            open={addStudentsOpen}
            onClose={this.handleAddStudentsClose}
          />
          <GradeInfo grade={grade} onAddStudents={this.handleAddStudentsOpen} />
          <SubjectsGrid gradeId={gradeId} subjects={grade.subjects} />
        </DefaultContainerRoute>
      );
    } else {
      toRender = <div className={classes.emptyGradeDetails}>Não encontramos a série desejada</div>;
    }
    return <Fade in>{toRender}</Fade>;
  }
}

GradeDetails.defalutProps = {
  students: [],
};

GradeDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchGradeById: PropTypes.func.isRequired,
  grade: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      gradeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      username: PropTypes.string,
    }),
  ),
};

function mapToProps({ institution, grade, subject, user }, ownProps) {
  const {
    match: {
      params: { gradeId },
    },
  } = ownProps;

  const selectedInstitution = institution.byId[institution.selectedInstitution];
  const propGrade = grade.byId[gradeId];
  if (propGrade && selectedInstitution) {
    return {
      grade: {
        ...propGrade,
        subjects: propGrade.subjects
          .filter(subId => subject.byId[subId])
          .map(subId => subject.byId[subId]),
      },
      students: selectedInstitution.students.filter(id => user.byId[id]).map(id => user.byId[id]),
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
  connect(
    mapToProps,
    mapDispatchToProps,
  )(GradeDetails),
);
