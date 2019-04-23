import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Image from '../../shared/Image';
import { MoreVert } from '@material-ui/icons';
import SubjectMenuInfo from './SubjectInfoMenu';
import React, { useState, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { defaultImagesPaths } from '../../../utils/constants';
import { ActionsContainer } from '../../shared/SharedComponents';
import { Button, Paper, Typography, withStyles, IconButton } from '@material-ui/core';

const PHOTO_DIMENSION = 150;

const styles = theme => ({
  imageContainer: {
    height: PHOTO_DIMENSION,
    width: PHOTO_DIMENSION,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 3,
    position: 'relative',
    width: `calc(100% - ${theme.spacing.unit * 2}px)`,
  },
  contentContainer: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: theme.spacing.unit,
  },
  menuIcon: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: 0,
    top: 0,
    height: 48,
    width: 48,
  },
});

const SubjectInfo = ({
  classes,
  subject,
  onSendEmailOpen,
  onAddStudentClick,
  onAddTeacherClick,
  onEditSubjectClick,
  onAddGradeClick,
  history,
  isAdmin,
  canSeeForum,
  userRole,
}) => {
  const menuId = 'subject-info__menu';
  const [menuState, setMenuState] = useState({ openMenu: false, menuAnchorEl: null });
  let image = null;
  if (subject.mimeType && subject.photo) {
    image = `${subject.mimeType},${subject.photo}`;
  }

  const handleMenuClose = e => {
    if (menuState.menuAnchorEl.contains(e.target)) {
      return;
    }
    setMenuState({ openMenu: false, menuAnchorEl: null });
  };

  return (
    <Fragment>
      <SubjectMenuInfo
        onClose={handleMenuClose}
        open={menuState.openMenu}
        id={menuId}
        anchorEl={menuState.menuAnchorEl}
        isAdmin={isAdmin}
        canSendEmail={userRole === 'TEACHER' || userRole === 'ADMIN'}
        onEditSubjectOpen={onEditSubjectClick}
        onAddTeacherOpen={onAddTeacherClick}
        onAddStudentOpen={onAddStudentClick}
        onSendEmailOpen={onSendEmailOpen}
      />
      <Paper className={classes.root}>
        <IconButton
          aria-haspopup="true"
          className={classes.menuIcon}
          onClick={evt => setMenuState({ menuAnchorEl: evt.currentTarget, openMenu: true })}
        >
          <MoreVert />
        </IconButton>
        <div className={classes.contentContainer}>
          <div className={classes.imageContainer}>
            <Image rounded={false} editable={false} src={image || defaultImagesPaths.SUBJECT} />
          </div>
          <div className={classes.infoContainer}>
            <Typography component="h2" variant="h6" gutterBottom>
              {subject.name}
            </Typography>
            <Typography component="span" variant="subtitle1" gutterBottom>
              {subject.teachers.length > 0
                ? `Professores: ${subject.teachers.map(({ username }) => username).join(', ')}`
                : 'Nenhum professor vinculado a essa disciplina'}
            </Typography>
          </div>
        </div>
        <ActionsContainer>
          {canSeeForum && (
            <Button color="primary" component={Link} to={`${history.location.pathname}/forum`}>
              Forum
            </Button>
          )}
          {userRole === 'TEACHER' && (
            <Button color="primary" onClick={onAddGradeClick}>
              Adicionar nova nota
            </Button>
          )}
        </ActionsContainer>
      </Paper>
    </Fragment>
  );
};

SubjectInfo.propTypes = {
  canSeeForum: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onAddGradeClick: PropTypes.func.isRequired,
  onAddStudentClick: PropTypes.func.isRequired,
  onAddTeacherClick: PropTypes.func.isRequired,
  onEditSubjectClick: PropTypes.func.isRequired,
  onSendEmailOpen: PropTypes.func.isRequired,
  subject: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    teachers: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  userRole: PropTypes.string.isRequired,
};

function mapStateToProps(
  { user: { loggedUserId }, institution: { byId, selectedInstitution } },
  { subject },
) {
  const isAdmin = byId[selectedInstitution]
    ? byId[selectedInstitution].admins.includes(loggedUserId)
    : false;
  let canSeeForum = isAdmin;
  if (subject) {
    canSeeForum =
      canSeeForum ||
      subject.teachers.some(user => user.id === loggedUserId) ||
      subject.students.some(user => user.id === loggedUserId);
  }
  const canSendEmailToSubjectStudents =
    isAdmin || subject.teachers.some(user => user.id === loggedUserId);

  let userRole = 'NO_ROLE';
  if (isAdmin) {
    userRole = 'ADMIN';
  } else if (subject.teachers.some(user => user.id === loggedUserId)) {
    userRole = 'TEACHER';
  } else if (subject.students.some(user => user.id === loggedUserId)) {
    userRole = 'STUDENT';
  }

  const canSeeGrades = isAdmin || subject.teachers.some(user => user.id === loggedUserId);

  return {
    userRole,
    isAdmin,
    canSeeForum,
    canSendEmailToSubjectStudents,
    canSeeGrades,
  };
}

export default connect(mapStateToProps)(withRouter(withStyles(styles)(SubjectInfo)));
