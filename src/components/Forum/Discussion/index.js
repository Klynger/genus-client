import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fade } from '@material-ui/core';
import DiscussionCard from './DiscussionCard';
import DefaultContainerRoute from '../../utils/DefaultContainerRoute';

const DiscussionPage = ({ discussion }) => {
  let toRender = null;

  if (discussion) {
    toRender = <DiscussionCard discussion={discussion} />;
  }

  return (
    <Fade in>
      <DefaultContainerRoute>{toRender}</DefaultContainerRoute>
    </Fade>
  );
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
  const singleDiscussion = discussion.byId[discussionId];
  if (singleDiscussion && user.byId[singleDiscussion.creator].username) {
    return {
      discussion: {
        ...singleDiscussion,
        creator: user.byId[singleDiscussion.creator],
        replies: singleDiscussion.replies.map(id => ({
          ...reply.byId[id],
          user: user.byId[reply.byId[id].user],
        })),
      },
    };
  }

  return {};
}

export default connect(mapStateToProps)(DiscussionPage);
