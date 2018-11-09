import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubjectInfo from './SubjectInfo';
import { Fade } from '@material-ui/core';
import AddStudentDialog from './AddStudentDialog';
import AddteacherDialog from './AddTeacherDialog';
import React, { Component, Fragment } from 'react';
import EditSubjectDialog from './EditSubjectDialog';
import DefaultContainerRoute from '../../utils/DefaultContainerRoute';

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

  render() {
    const { subject } = this.props;
    const { openAddStudent, openAddTeacher, openEditSubject } = this.state;

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
          <SubjectInfo
            subject={subject}
            onAddTeacherClick={this.handleAddTeacherClick}
            onAddStudentClick={this.handleOpenAddStudent}
            onEditSubjectClick={this.handleEditSubjectClick}
          />
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
  subject: PropTypes.object,
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
        teachers: sub.teachers.map(id => user.byId[id]),
      },
    };
  }

  return {};
}

export default connect(mapToProps)(SubjectDetailsPage);
