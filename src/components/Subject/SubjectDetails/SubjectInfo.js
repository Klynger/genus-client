import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { ActionsContainer } from '../../shared/SharedComponents';
import { DEFAULT_PHOTO_CLASS_SRC } from '../../../utils/helpers';
import { Button, Paper, Typography, withStyles } from '@material-ui/core';

const PHOTO_DIMENSION = 200;

const styles = theme => ({
  photo: {
    height: '100%',
    width: PHOTO_DIMENSION,
  },
  root: {
    borderRadius: 0,
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
  onAddStudentClick,
  onAddTeacherClick,
  onEditSubjectClick,
  history,
  isAdmin,
  canSeeForum,
  canSeeGrades,
}) => (
  <Paper className={classes.root}>
    <div className={classes.contentContainer}>
      <img
        alt={subject.name}
        className={classes.photo}
        src={subject.photo || DEFAULT_PHOTO_CLASS_SRC}
      />
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
      {canSeeGrades && (
        <Button color="primary" component={Link} to={`${history.location.pathname}/forum`}>
          Adicionar nova nota
        </Button>
      )}
      {canSeeGrades && (
        <Button color="primary" component={Link} to={`${history.location.pathname}/forum`}>
          Mandar email para turma
        </Button>
      )}
    </ActionsContainer>
  </Paper>
);

SubjectInfo.propTypes = {
  canSeeForum: PropTypes.bool.isRequired,
  canSeeGrades: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onAddStudentClick: PropTypes.func.isRequired,
  onAddTeacherClick: PropTypes.func.isRequired,
  onEditSubjectClick: PropTypes.func.isRequired,
  subject: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    teachers: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
};

function mapStateToProps(
  { user: { loggedUserId }, institution: { byId, selectedInstitution } },
  { subject },
) {
  const isAdmin =
    selectedInstitution && byId[selectedInstitution]
      ? byId[selectedInstitution].admins.includes(loggedUserId)
      : false;
  let canSeeForum = isAdmin;
  if (subject) {
    canSeeForum =
      canSeeForum ||
      subject.teachers.some(user => user.id === loggedUserId) ||
      subject.students.some(user => user.id === loggedUserId);
  }

  const canSeeGrades = isAdmin || subject.teachers.some(user => user.id === loggedUserId);

  return {
    isAdmin,
    canSeeForum,
    canSeeGrades,
  };
}

export default connect(mapStateToProps)(withRouter(withStyles(styles)(SubjectInfo)));
