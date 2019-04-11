import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DiscussionsList from './DiscussionsList';
import { Button, Fade, withStyles } from '@material-ui/core';
import DefaultContainerRoute from '../../shared/DefaultContainerRoute';
import { ResponsiveTitle, ActionsContainer } from '../../shared/SharedComponents';

const styles = theme => ({
  actionsContainer: {
    marginTop: theme.spacing.unit * 4,
  },
});

const ForumDiscussions = props => {
  const {
    canCreateDiscussion,
    classes,
    discussions,
    match: { url },
    subject,
  } = props;

  return (
    <Fade in>
      <DefaultContainerRoute>
        <ResponsiveTitle>Forum {subject && `- ${subject.name}`}</ResponsiveTitle>
        <ActionsContainer className={classes.actionsContainer}>
          {canCreateDiscussion && (
            <Button component={Link} to={`${url}/new-discussion`} color="primary">
              Criar uma discussão
            </Button>
          )}
        </ActionsContainer>
        <DiscussionsList discussions={discussions} />
      </DefaultContainerRoute>
    </Fade>
  );
};

ForumDiscussions.defaultProps = {
  discussions: [],
};

ForumDiscussions.propTypes = {
  canCreateDiscussion: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  discussions: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      subjectId: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  subject: PropTypes.object,
};

function mapToProps(
  { discussion, subject, user },
  {
    match: {
      params: { subjectId },
    },
  },
) {
  if (subject.byId[subjectId]) {
    const fullSubject = subject.byId[subjectId];
    const { loggedUserId } = user;
    const canCreateDiscussion =
      fullSubject.teachers.some(_user => _user === loggedUserId) ||
      fullSubject.students.some(_user => _user === loggedUserId);
    return {
      discussions: subject.byId[subjectId].forum.map(id => {
        const disc = discussion.byId[id];
        return {
          ...disc,
          creator: {
            ...user.byId[disc.creator],
          },
        };
      }),
      subject: fullSubject,
      canCreateDiscussion,
    };
  }

  return {};
}

export default connect(mapToProps)(withStyles(styles)(ForumDiscussions));
