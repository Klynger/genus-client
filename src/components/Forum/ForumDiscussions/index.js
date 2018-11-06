import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DiscussionsList from './DiscussionsList';

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

const ForumDiscussions = props => {
  const { discussions } = props;
  return (
    <Container>
      <DiscussionsList discussions={discussions} />
    </Container>
  );
};

ForumDiscussions.defaultProps = {
  discussions: [],
};

ForumDiscussions.propTypes = {
  discussions: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      subjectId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
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
    };
  }

  return {};
}

export default connect(mapToProps)(ForumDiscussions);
