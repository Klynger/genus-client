import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubjectInfo from './SubjectInfo';
import { Fade } from '@material-ui/core';
import AddStudentDialog from './AddStudentDialog';
import AddteacherDialog from './AddTeacherDialog';
import React, { Component, Fragment } from 'react';
import EditSubjectDialog from './EditSubjectDialog';
import { emailType } from '../../../utils/constants';
import UserList from '../../Institution/InstitutionDetails/UserList';
import DefaultContainerRoute from '../../shared/DefaultContainerRoute';
import SendEmailDialog from '../../Institution/InstitutionDetails/SendEmailDialog';

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
      openEditSubject: false,
      sendEmailOpen: false,
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

  handleOpenAddStudent = () => {
    this.setState({ openAddStudent: true });
  };

  handleCloseAddStudent = () => {
    this.setState({ openAddStudent: false });
  };

  handleSendEmailOpen = () => {
    this.setState({ sendEmailOpen: true });
  };

  handleSendEmailClose = () => {
    this.setState({ sendEmailOpen: false });
  };

  render() {
    const { subject, canSendEmailToSubjectStudents } = this.props;
    const { openAddStudent, openAddTeacher, openEditSubject, sendEmailOpen } = this.state;

    let toRender;

    if (subject) {
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
          <EditSubjectDialog
            subjectId={subject.id}
            open={openEditSubject}
            onClose={this.handleEditSubjectClick}
          />
          {canSendEmailToSubjectStudents && (
            <SendEmailDialog
              open={sendEmailOpen}
              sendEmailType={emailType.TO_ALL_SUBJECT_STUDENTS}
              id={subject.id}
              onClose={this.handleSendEmailClose}
              showSelectRole={false}
            />
          )}
          <SubjectInfo
            subject={subject}
            onAddTeacherClick={this.handleAddTeacherClick}
            onAddStudentClick={this.handleOpenAddStudent}
            onEditSubjectClick={this.handleEditSubjectClick}
            onSendEmailOpen={this.handleSendEmailOpen}
            showSelectRole={false}
          />
          <UserList users={subject.students} headTitle="Alunos" />
        </Fragment>
      );
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
    return {
      subject: {
        ...sub,
        teachers: sub.teachers.filter(id => user.byId[id]).map(id => user.byId[id]),
        students: sub.students.filter(id => user.byId[id]).map(id => user.byId[id]),
      },
      canSendEmailToSubjectStudents: sub.teachers
        .filter(id => user.byId[id])
        .map(id => user.byId[id]),
    };
  }

  return {};
}

export default connect(mapToProps)(SubjectDetailsPage);
