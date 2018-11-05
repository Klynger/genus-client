import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { DEFAULT_PHOTO_CLASS_SRC } from '../../utils/helpers';
import { ActionsContainer } from '../../utils/SharedComponents';
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
      <Button color="primary" onClick={onEditSubjectClick}>
        Atualizar Informações
      </Button>
      <Button color="primary" onClick={onAddTeacherClick}>
        Vincular professor
      </Button>
      <Button color="primary" onClick={onAddStudentClick}>
        Vincular aluno
      </Button>
      <Button color="primary" component={Link} to={`${history.location.pathname}/forum`}>
        Forum
      </Button>
    </ActionsContainer>
  </Paper>
);

SubjectInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onAddStudentClick: PropTypes.func.isRequired,
  onAddTeacherClick: PropTypes.func.isRequired,
  onEditSubjectClick: PropTypes.func.isRequired,
  subject: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    teachers: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
};

export default withRouter(withStyles(styles)(SubjectInfo));
