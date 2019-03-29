import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GradesList from './GradesList';
import GradesInfo from './GradesInfo';
import SubjectInfo from './SubjectInfo';
import { Fade } from '@material-ui/core';
import AddGradeDialog from './AddGradeDialog';
import AddStudentDialog from './AddStudentDialog';
import AddteacherDialog from './AddTeacherDialog';
import React, { Component, Fragment } from 'react';
import EditSubjectDialog from './EditSubjectDialog';
import DefaultContainerRoute from '../../shared/DefaultContainerRoute';

/*
 * This component needs data that is fetched by other
 * component, it needs to change.
 * TODO add apollo-graphql and me this component get its
 * own data.
 */
class SubjectDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openAddStudent: false,
      openAddTeacher: false,
      openAddGrade: false,
      openEditSubject: false,
    };
  }

  handleAddTeacherClick = () => {
    this.setState(({ openAddTeacher }) => ({
      openAddTeacher: !openAddTeacher,
    }));
  };

  handleEditSubjectClick = () => {
    this.setState(({ openEditSubject }) => ({
      openEditSubject: !openEditSubject,
    }));
  };

  handleOpenAddGrade = () => {
    this.setState({ openAddGrade: true });
  };

  handleCloseAddGrade = () => {
    this.setState({ openAddGrade: false });
  };

  handleOpenAddStudent = () => {
    this.setState({ openAddStudent: true });
  };

  handleCloseAddStudent = () => {
    this.setState({ openAddStudent: false });
  };

  render() {
    const { subject, isStudent, user } = this.props;
    const { openAddStudent, openAddTeacher, openEditSubject, openAddGrade } = this.state;

    // TODO: remove this when grades is integrated with
    // backend.
    const studentSubjects = [
      {
        user: {
          name: 'aluno 1',
          id: 1,
          email: 'alu1@gmail.com',
        },
        evaluations: [
          {
            name: 'Prova 1',
            result: 10,
            weight: 0.4,
          },
          {
            name: 'Prova 2',
            result: 8,
            weight: 0.6,
          },
        ],
      },
      {
        user: {
          id: 2,
          name: 'aluno 2',
          email: 'alu2@gmail.com',
        },
        evaluations: [
          {
            name: 'Prova 1',
            result: 4,
            weight: 0.4,
          },
          {
            name: 'Prova 2',
            result: 8,
            weight: 0.6,
          },
        ],
      },
    ];

    // TODO: remove this when grade is integrated with backend.
    const userStudentSubjects = [
      {
        user: {
          name: 'aluno 1',
          id: 1,
          email: 'alu1@gmail.com',
        },
        evaluations: [
          {
            name: 'Prova 1',
            result: 10,
            weight: 0.4,
          },
          {
            name: 'Prova 2',
            result: 8,
            weight: 0.6,
          },
        ],
      },
    ];

    let toRender;

    if (subject) {
      if (isStudent) {
        toRender = (
          <Fragment>
            <SubjectInfo subject={subject} />
            <GradesInfo user={user} studentSubjects={userStudentSubjects} />
          </Fragment>
        );
      } else {
        toRender = (
          <Fragment>
            <AddteacherDialog
              subject={subject}
              open={openAddTeacher}
              onClose={this.handleAddTeacherClick}
            />
            <AddStudentDialog
              subject={subject}
              open={openAddStudent}
              onClose={this.handleCloseAddStudent}
            />
            <AddGradeDialog
              subject={subject}
              open={openAddGrade}
              openAddTeacheropenAddTeacher
              onClose={this.handleCloseAddGrade}
            />
            <EditSubjectDialog
              subjectId={subject.id}
              open={openEditSubject}
              onClose={this.handleEditSubjectClick}
            />
            <SubjectInfo
              subject={subject}
              onAddTeacherClick={this.handleAddTeacherClick}
              onAddStudentClick={this.handleOpenAddStudent}
              onEditSubjectClick={this.handleEditSubjectClick}
              onAddGradeClick={this.handleOpenAddGrade}
            />
            <GradesList
              users={subject.students}
              studentSubjects={studentSubjects}
              headTitle="Alunos"
            />
          </Fragment>
        );
      }
    } else {
      toRender = null;
    }

    return (
      <Fade in>
        <DefaultContainerRoute>{toRender}</DefaultContainerRoute>
      </Fade>
    );
  }
}

SubjectDetailsPage.propTypes = {
  isStudent: PropTypes.bool,
  subject: PropTypes.shape({
    id: PropTypes.string.isRequired,
    students: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        username: PropTypes.string,
      }),
    ).isRequired,
    teachers: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        username: PropTypes.string,
      }),
    ).isRequired,
  }),
  user: PropTypes.object,
};

function mapToProps(
  { subject, user },
  {
    match: {
      params: { subjectId },
    },
  },
) {
  const sub = subject.byId[subjectId];
  if (sub) {
    const isStudent = sub.students.some(_user => _user.id === user.loggedUserId).length > 0;
    return {
      isStudent,
      subject: {
        ...sub,
        teachers: sub.teachers.filter(id => user.byId[id]).map(id => user.byId[id]),
        students: sub.students.filter(id => user.byId[id]).map(id => user.byId[id]),
      },
    };
  }

  return {};
}

export default connect(mapToProps)(SubjectDetailsPage);
