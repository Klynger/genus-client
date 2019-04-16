import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubjectInfo from './SubjectInfo';
import StudentsTable from './StudentsTable';
import AddGradeDialog from './AddGradeDialog';
import AddStudentDialog from './AddStudentDialog';
import AddteacherDialog from './AddTeacherDialog';
import React, { Component, Fragment } from 'react';
import { Fade, withTheme } from '@material-ui/core';
import EditSubjectDialog from './EditSubjectDialog';
import { emailType } from '../../../utils/constants';
import { getUserRole } from '../../../utils/helpers';
import { removeStudentFromSubjectId } from '../../../actions/user';
import DefaultContainerRoute from '../../shared/DefaultContainerRoute';
import RemoveStudentFromSubjectDialog from './RemoveStudentFromSubjectDialog';
import SendEmailDialog from '../../Institution/InstitutionDetails/SendEmailDialog';

class SubjectDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openAddStudent: false,
      openAddTeacher: false,
      openAddGrade: false,
      openEditSubject: false,
      sendEmailOpen: false,
      openRemoveStudent: false,
      selectedStudent: null,
      waitingForRemoveStudent: false,
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

  handleOpenRemoveStudentDialog = studentId => {
    const {
      subject: { students },
    } = this.props;

    let selectedStudent = null;
    students.forEach(student => {
      if (student.id === studentId) {
        selectedStudent = student;
      }
    });

    this.setState({ openRemoveStudent: true, selectedStudent });
  };

  handleSendEmailOpen = () => {
    this.setState({ sendEmailOpen: true });
  };

  handleSendEmailClose = () => {
    this.setState({ sendEmailOpen: false });
  };

  handleCloseRemoveStudentDialog = () => {
    this.setState({ openRemoveStudent: false });
  };

  handleConfirmRemoveStudent = () => {
    const {
      subject: { id },
      removeStudentFromSubject,
      // theme,
    } = this.props;
    const { selectedStudent } = this.state;
    this.setState({ waitingForRemoveStudent: true });
    removeStudentFromSubject({ subjectId: id, studentId: selectedStudent.id }).then(() => {
      this.handleCloseRemoveStudentDialog();
      window.location.reload();
      // setTimeout(() => {
      //   this.setState({ waitingForRemoveStudent: false });
      // }, theme.transitions.duration.leavingScreen);
    });
  };

  render() {
    const { subject, loggedUserId, canSendEmailToSubjectStudents } = this.props;
    const {
      openAddGrade,
      openAddStudent,
      openAddTeacher,
      openEditSubject,
      openRemoveStudent,
      waitingForRemoveStudent,
      sendEmailOpen,
    } = this.state;

    let toRender;

    if (subject) {
      const { userRole } = this.props;
      if (userRole === 'STUDENT') {
        toRender = (
          <Fragment>
            <SubjectInfo subject={subject} />
            {/* <GradesInfo user={user} studentSubjects={userStudentSubjects} /> */}
          </Fragment>
        );
      } else {
        const { studentsData, evaluationHeaders } = this.props;
        toRender = (
          <Fragment>
            <AddteacherDialog
              subject={subject}
              open={openAddTeacher}
              onClose={this.handleAddTeacherClick}
            />
            {canSendEmailToSubjectStudents && (
              <SendEmailDialog
                open={sendEmailOpen}
                sendEmailType={emailType.TO_ALL_SUBJECT_STUDENTS}
                id={subject.id}
                onClose={this.handleSendEmailClose}
              />
            )}
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
              onSendEmailOpen={this.handleSendEmailOpen}
            />
            <RemoveStudentFromSubjectDialog
              open={openRemoveStudent}
              isSubmitting={waitingForRemoveStudent}
              onClose={this.handleCloseRemoveStudentDialog}
              onConfirmation={this.handleConfirmRemoveStudent}
            />
            <StudentsTable
              userRole={userRole}
              subjectId={subject.id}
              loggedUserId={loggedUserId}
              studentsData={studentsData}
              evaluationHeaders={evaluationHeaders}
              onRemoveStudent={this.handleOpenRemoveStudentDialog}
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
  canSendEmailToSubjectStudents: PropTypes.bool,
  evaluationHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  loggedUserId: PropTypes.string.isRequired,
  removeStudentFromSubject: PropTypes.func.isRequired,
  studentsData: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      evaluations: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          result: PropTypes.number.isRequired,
        }),
      ).isRequired,
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  ),
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
  // theme: PropTypes.shape({
  //   transitions: PropTypes.shape({
  //     duration: PropTypes.shape({
  //       leavingScreen: PropTypes.number.isRequired,
  //     }).isRequired,
  //   }).isRequired,
  // }).isRequired,
  // user: PropTypes.object,
  userRole: PropTypes.string.isRequired,
};

function mapToProps(
  { subject, user, evaluation, institution, evaluationResult },
  {
    match: {
      params: { subjectId },
    },
  },
) {
  const sub = subject.byId[subjectId];
  const { loggedUserId } = user;
  let result = { loggedUserId };
  if (sub) {
    const { selectedInstitution } = institution;
    let students = sub.students.filter(id => user.byId[id]);
    let teachers = sub.teachers.filter(id => user.byId[id]);
    const admins = institution.byId[selectedInstitution].admins.filter(id => user.byId[id]);
    let evaluations = sub.evaluations.filter(id => evaluation.byId[id]);
    const userRole = getUserRole(students, admins, teachers, loggedUserId);
    students = students.map(id => user.byId[id]);
    teachers = teachers.map(id => user.byId[id]);
    evaluations = evaluations.map(id => evaluation.byId[id]);
    const evaluationHeaders = [];

    evaluations.forEach(ev => {
      evaluationHeaders.push(ev.name);
      ev.evaluationResults = ev.evaluationResults
        .filter(id => evaluationResult.byId[id])
        .map(id => evaluationResult.byId[id]);
    });
    const studentsData = students.map(student => {
      const studentData = {
        id: student.id,
        username: student.username,
        email: student.email,
        evaluations: evaluations.map(ev => {
          const evResult = ev.evaluationResults.filter(re => re.user === student.id);
          if (evResult.length === 1) {
            return evResult[0];
          }
          return 0;
        }),
      };

      return studentData;
    });

    result = {
      userRole,
      studentsData,
      evaluationHeaders,
      loggedUserId,
      subject: {
        ...sub,
        teachers,
        students,
        evaluations,
      },
      canSendEmailToSubjectStudents:
        teachers.some(teacher => teacher.id === user.loggedUserId) ||
        admins.some(admin => admin.id === user.loggedUserId),
    };
  }

  return result;
}

function mapDispatchToProps(dispatch) {
  return {
    removeStudentFromSubject: input => dispatch(removeStudentFromSubjectId(input)),
  };
}

export default connect(
  mapToProps,
  mapDispatchToProps,
)(withTheme()(SubjectDetailsPage));
