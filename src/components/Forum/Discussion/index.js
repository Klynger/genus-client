import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import React, { Fragment } from 'react';
import DiscussionCard from './DiscussionCard';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: ${({ unit }) => unit || 8}px;

  @media screen and (min-width: 1920px) {
    width: calc(50% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (min-width: 1280px) and (max-width: 1919px) {
    width: calc(60% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (min-width: 960px) and (max-width: 1279px) {
    width: calc(70% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (min-width: 700px) and (max-width: 959px) {
    width: calc(80% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (min-width: 600px) and (max-width: 699px) {
    width: calc(85% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (max-width: 599px) {
    width: calc(95% - ${({ unit }) => (unit || 8) * 2}px);
  }
`;

const DiscussionPage = ({ discussion }) => {
  let toRender = null;

  if (discussion) {
    toRender = (
      <Fragment>
        <DiscussionCard discussion={discussion} />
      </Fragment>
    );
  }

  return <Container>{toRender}</Container>;
};

DiscussionPage.propTypes = {
  discussion: PropTypes.object,
};

function mapStateToProps(
  { discussion, reply, user },
  {
    match: {
      params: { discussionId },
    },
  },
) {
  if (discussion.byId[discussionId]) {
    const singleDiscussion = reply.byId[discussion.byId[discussionId].replies[0]];
    return {
      discussion: {
        ...discussion.byId[discussionId],
        ...singleDiscussion,
        creator: user.byId[singleDiscussion.user],
        replies: [], // don't have replies yet
      },
    };
  }

  return {};
}

export default connect(mapStateToProps)(DiscussionPage);
