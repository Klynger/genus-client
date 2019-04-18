import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Image from '../../shared/Image';
import { withRouter, Link } from 'react-router-dom';
import { defaultImagesPaths } from '../../../utils/constants';
import { ActionsContainer } from '../../shared/SharedComponents';
import { Button, Paper, Typography, withStyles } from '@material-ui/core';

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
  let image = null;
  if (subject.mimeType && subject.photo) {
    image = `${subject.mimeType},${subject.photo}`;
  }

  return (
    <Paper className={classes.root}>
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
        {isAdmin && (
          <span>
            <Button color="primary" onClick={onEditSubjectClick}>
              Atualizar Informações
            </Button>
            <Button color="primary" onClick={onAddTeacherClick}>
              Vincular professor
            </Button>
            <Button color="primary" onClick={onAddStudentClick}>
              Vincular aluno
            </Button>
          </span>
        )}
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
        {(userRole === 'TEACHER' || userRole === 'ADMIN') && (
          <Button color="primary" onClick={onSendEmailOpen}>
            Enviar Email
          </Button>
        )}
      </ActionsContainer>
    </Paper>
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
