import AddReply from './AddReply';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RepliesList from './RepliesList';
import DiscussionCard from './DiscussionCard';
import React, { Component, Fragment } from 'react';
import { Fade, withStyles } from '@material-ui/core';
import DefaultContainerRoute from '../../shared/DefaultContainerRoute';

const styles = theme => ({
  addReply: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  repliesList: {
    marginTop: theme.spacing.unit * 2,
  },
});

class DiscussionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddReply: false,
    };
  }

  handleToggleShowAddReply = () => {
    this.setState(({ openAddReply }) => ({ openAddReply: !openAddReply }));
  };

  handleCloseAddReply = () => {
    this.setState({ openAddReply: false });
  };

  render() {
    let toRender = null;
    const { classes, discussion } = this.props;
    const { openAddReply } = this.state;

    if (discussion) {
      toRender = (
        <Fragment>
          <DiscussionCard onReply={this.handleToggleShowAddReply} discussion={discussion} />
          {openAddReply && (
            <AddReply
              className={classes.addReply}
              discussionId={discussion.id}
              onClose={this.handleCloseAddReply}
              onSubmit={this.handleCloseAddReply}
            />
          )}
          <RepliesList replies={discussion.replies} className={classes.repliesList} />
        </Fragment>
      );
    }
    return (
      <Fade in>
        <DefaultContainerRoute>{toRender}</DefaultContainerRoute>
      </Fade>
    );
  }
}

DiscussionPage.propTypes = {
  classes: PropTypes.object.isRequired,
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
  if (singleDiscussion && user.byId[singleDiscussion.creator]) {
    return {
      discussion: {
        ...singleDiscussion,
        creator: user.byId[singleDiscussion.creator],
        replies: singleDiscussion.replies
          .filter(id => reply.byId[id])
          .map(id => {
            const aux = reply.byId[id];

            return {
              ...aux,
              user: user.byId[aux.user],
              parent: aux.parent && reply.byId[aux.parent],
              discussion: singleDiscussion,
            };
          }),
      },
    };
  }

  return {};
}

export default connect(mapStateToProps)(withStyles(styles)(DiscussionPage));
