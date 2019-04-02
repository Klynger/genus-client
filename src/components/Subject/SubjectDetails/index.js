import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GradesInfo from './GradesInfo';
import SubjectInfo from './SubjectInfo';
import { Fade } from '@material-ui/core';
import StudentsTable from './StudentsTable';
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
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.subject && nextProps.subject.students) {
      const { students } = nextProps.subject;
      let evaluationHeaders = [];
      const studentsData = students.map(student => {
        const { studentSubject } = student;
        const evaluations =
          studentSubject && studentSubject.evaluations ? studentSubject.evaluations : [];

        const output = {
          id: student.id,
          username: student.username,
          email: student.email,
          evaluations,
        };
        return output;
      });

      if (studentsData.length > 0) {
        evaluationHeaders = studentsData[0].evaluations.map(ev => ev.name);
      }

      return { studentsData, evaluationHeaders };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      openAddStudent: false,
      openAddTeacher: false,
      openAddGrade: false,
      openEditSubject: false,
    };
  }

  componentDidMount() {
    this.forceUpdate();
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
      const { userRole } = this.props;
      if (isStudent) {
        toRender = (
          <Fragment>
            <SubjectInfo subject={subject} />
            <GradesInfo user={user} studentSubjects={userStudentSubjects} />
          </Fragment>
        );
      } else {
        const { studentsData, evaluationHeaders } = this.state;
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
            <StudentsTable
              userRole={userRole}
              studentsData={studentsData}
              evaluationHeaders={evaluationHeaders}
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
  userRole: PropTypes.string.isRequired,
};

function mapToProps(
  { subject, user, studentSubject, evaluation, institution },
  {
    match: {
      params: { subjectId },
    },
  },
) {
  const sub = subject.byId[subjectId];
  if (sub) {
    const { selectedInstitution } = institution;
    const { loggedUserId } = user;
    const students = sub.students.filter(id => user.byId[id]).map(id => user.byId[id]);
    const isStudent = sub.students.some(userId => userId === user.loggedUserId);
    const isTeacher = sub.teachers.some(userId => userId === user.loggedUserId);
    const isAdmin = institution.byId[selectedInstitution].admins.includes(loggedUserId);
    let userRole = 'NO_ROLE';

    if (isStudent) {
      userRole = 'STUDENT';
    } else if (isTeacher) {
      userRole = 'TEACHER';
    } else if (isAdmin) {
      userRole = 'ADMIN';
    }

    students.forEach(student => {
      const studentSubArr = student.studentSubjectRelations
        .filter(id => {
          const studentSub = studentSubject.byId[id];
          if (studentSub && studentSub.subject === sub.id) {
            return true;
          }
          return false;
        })
        .map(id => {
          const ss = studentSubject.byId[id];
          ss.evaluations = ss.evaluations
            .filter(evId => evaluation.byId[evId])
            .map(evId => evaluation.byId[evId]);
          return ss;
        });

      student.studentSubject = studentSubArr[0];
    });
    return {
      isStudent,
      userRole,
      subject: {
        ...sub,
        teachers: sub.teachers.filter(id => user.byId[id]).map(id => user.byId[id]),
        students,
      },
    };
  }

  return {};
}

export default connect(mapToProps)(SubjectDetailsPage);
