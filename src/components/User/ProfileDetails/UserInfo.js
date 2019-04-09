import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditUserDialog from './EditUserDialog';
import CardDetailsList from './CardDetailsList';
import React, { Component, Fragment } from 'react';
import { userRoles } from '../../../utils/constants';
import EditPasswordDialog from './EditPasswordDialog';
import ImageUploader from '../../shared/ImageUploader';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { getFirstInitialsCapitalized, getRoleFromInstitution } from '../../../utils/helpers';
import { Card, Button, withStyles, Typography, CardContent, CardActions } from '@material-ui/core';

const styles = theme => ({
  card: {
    borderRadius: 0,
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  imageContainer: {
    padding: theme.spacing.unit * 2,
    paddingTop: 0,
  },
  imageUploader: {
    backgroundColor: deepOrange.A400,
    fontSize: '4.25rem',
    minHeight: 140,
    minWidth: 140,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  lastChild: {
    marginBottom: theme.spacing.unit * 3,
  },
});

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editUserOpen: false,
      editPasswordOpen: false,
    };
  }

  get userInitials() {
    return getFirstInitialsCapitalized(this.props.user.username);
  }

  handleEditUserToggle = () => {
    this.setState(({ editUserOpen }) => ({ editUserOpen: !editUserOpen }));
  };

  handleEditUserClose = () => {
    this.setState({ editUserOpen: false });
  };

  handleEditPasswordToggle = () => {
    this.setState(({ editPasswordOpen }) => ({ editPasswordOpen: !editPasswordOpen }));
  };

  handleEditPasswordClose = () => {
    this.setState({ editPasswordOpen: false });
  };

  render() {
    const { classes, gradeList, loggedUserId, subjectList, user } = this.props;
    const { editUserOpen, editPasswordOpen } = this.state;

    return (
      <Fragment>
        <EditUserDialog user={user} open={editUserOpen} onClose={this.handleEditUserClose} />
        <EditPasswordDialog open={editPasswordOpen} onClose={this.handleEditPasswordClose} />
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <div className={classes.imageContainer}>
              <ImageUploader
                alt={this.userInitials}
                initials={this.userInitials}
                className={classes.imageUploader}
              />
            </div>
            <Typography variant="h5" component="h2">
              {user.username}
            </Typography>
            <Typography variant="subtitle1" component="span">
              {user.email}
            </Typography>
          </CardContent>
          {loggedUserId === user.id && (
            <CardActions className={classes.actions}>
              <Button color="primary" onClick={this.handleEditPasswordToggle}>
                Alterar senha
              </Button>
              <Button color="primary" onClick={this.handleEditUserToggle}>
                Editar informações
              </Button>
            </CardActions>
          )}
        </Card>
        {gradeList && (
          <CardDetailsList className={classes.cardDetails} contentList={gradeList} label="Séries" />
        )}
        {subjectList && (
          <CardDetailsList
            className={classes.lastChild}
            contentList={subjectList}
            label="Disciplinas"
          />
        )}
      </Fragment>
    );
  }
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  gradeList: PropTypes.array,
  loggedUserId: PropTypes.string.isRequired,
  subjectList: PropTypes.array,
  user: PropTypes.object.isRequired,
};

const getSubjectListByRole = (user, selectedUser) => {
  if (selectedUser.role === userRoles.STUDENT) {
    return user.byId[selectedUser.loggedUserId].studentSubjects;
  }
  return user.byId[selectedUser.loggedUserId].teacherSubjects;
};

function mapToProps({ user, institution, subject, grade }) {
  const result = {
    loggedUserId: user.loggedUserId,
  };

  if (institution.byId[institution.selectedInstitution]) {
    result.role = getRoleFromInstitution(
      result.loggedUserId,
      institution.byId[institution.selectedInstitution],
    );
    const hasSubjectList = result.role === userRoles.STUDENT || result.role === userRoles.TEACHER;
    if (user.byId[result.loggedUserId] && hasSubjectList) {
      const userSubjectIdList = getSubjectListByRole(user, result, grade, subject);
      result.subjectList = userSubjectIdList.map(id => {
        const selectedSubject = subject.byId[id];
        if (selectedSubject) {
          selectedSubject.gradeName = grade.byId[selectedSubject.grade].name;
        }
        return selectedSubject;
      });

      if (result.role === userRoles.TEACHER) {
        result.gradeList = userSubjectIdList
          .map(id => grade.byId[subject.byId[id].grade])
          .reduce((prev, curr) => (!prev.includes(curr) ? [...prev, curr] : prev), []);
      }
    }
  }

  return result;
}

export default connect(mapToProps)(withStyles(styles)(UserInfo));
