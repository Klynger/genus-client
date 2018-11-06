import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DiscussionsList from './DiscussionsList';
import { Button, Fade, withStyles } from '@material-ui/core';
import { ResponsiveTitle, ActionsContainer } from '../../utils/SharedComponents';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: ${({ unit }) => unit || 8}px;

  @media screen and (min-width: 1920px) {
    width: calc(50% - ${({ unit }) => (unit || 8) * 3}px);
  }

  @media screen and (min-width: 1280px) and (max-width: 1919px) {
    width: calc(60% - ${({ unit }) => (unit || 8) * 3}px);
  }

  @media screen and (min-width: 960px) and (max-width: 1279px) {
    width: calc(70% - ${({ unit }) => (unit || 8) * 3}px);
  }

  @media screen and (min-width: 700px) and (max-width: 959px) {
    width: calc(80% - ${({ unit }) => (unit || 8) * 3}px);
  }

  @media screen and (min-width: 600px) and (max-width: 699px) {
    width: calc(85% - ${({ unit }) => (unit || 8) * 3}px);
  }

  @media screen and (max-width: 599px) {
    width: calc(95% - ${({ unit }) => (unit || 8) * 3}px);
  }
`;

const styles = theme => ({
  actionsContainer: {
    marginTop: theme.spacing.unit * 4,
  },
});

const ForumDiscussions = props => {
  const {
    classes,
    discussions,
    match: { url },
    subject,
  } = props;

  return (
    <Fade in>
      <Container>
        <ResponsiveTitle>Forúm {subject && `- ${subject.name}`}</ResponsiveTitle>
        <ActionsContainer className={classes.actionsContainer}>
          <Button component={Link} to={`${url}/new-discussion`} color="primary">
            Criar uma discussão
          </Button>
        </ActionsContainer>
        <DiscussionsList discussions={discussions} />
      </Container>
    </Fade>
  );
};

ForumDiscussions.defaultProps = {
  discussions: [],
};

ForumDiscussions.propTypes = {
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
      subject: subject.byId[subjectId],
    };
  }

  return {};
}

export default connect(mapToProps)(withStyles(styles)(ForumDiscussions));
