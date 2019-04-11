import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { MoreVert, Reply } from '@material-ui/icons';
import ImageUploader from '../../shared/ImageUploader';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { getFirstInitialsCapitalized, isInstitutionAdmin } from '../../../utils/helpers';
import {
  Card,
  Divider,
  IconButton,
  withStyles,
  CardHeader,
  CardContent,
  CardActions,
} from '@material-ui/core';

const styles = {
  imageUploader: {
    backgroundColor: deepOrange.A400,
    fontSize: '1.25rem',
    minHeight: 40,
    minWidth: 40,
  },
  discussionCard: {
    width: '100%',
  },
  reply: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  content: {
    overflowX: 'auto',
  },
};

const DiscussionActionButtons = ({ classes, onReply, isAdmin }) => (
  /*
    TODO: add these options

    <IconButton aria-label="delete">
      <Delete />
    </IconButton>

    <IconButton aria-label="edit">
      <Edit />
    </IconButton>
   */
  <CardActions disableActionSpacing className={classes.actions}>
    {!isAdmin && (
      <IconButton aria-label="reply" onClick={onReply}>
        <Reply />
      </IconButton>
    )}
  </CardActions>
);

DiscussionActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  onReply: PropTypes.func.isRequired,
};

const DiscussionCard = ({ classes, discussion, onReply, isAdmin }) => (
  <Card className={classes.discussionCard}>
    <CardHeader
      avatar={
        <ImageUploader
          alt={getFirstInitialsCapitalized(discussion.creator.username)}
          initials={getFirstInitialsCapitalized(discussion.creator.username)}
          className={classes.imageUploader}
        />
      }
      action={
        <IconButton>
          <MoreVert />
        </IconButton>
      }
      title={discussion.creator.username}
      subheader={discussion.createdAt}
    />
    <Divider light />
    <CardContent className={classes.content}>
      <ReactMarkdown escapeHtml source={discussion.content} />
    </CardContent>
    <DiscussionActionButtons classes={classes} onReply={onReply} isAdmin={isAdmin} />
  </Card>
);

DiscussionCard.propTypes = {
  classes: PropTypes.object.isRequired,
  discussion: PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        date: PropTypes.string,
        user: PropTypes.shape({
          username: PropTypes.string.isRequired,
        }),
      }),
    ).isRequired,
    title: PropTypes.string,
  }).isRequired,
  isAdmin: PropTypes.bool,
  onReply: PropTypes.func.isRequired,
};

function mapStateToProps({ institution, user }) {
  const { loggedUserId } = user;
  const { selectedInstitution } = institution;
  const currentInstitution = institution.byId[selectedInstitution];
  const isAdmin = isInstitutionAdmin(loggedUserId, currentInstitution);
  return { isAdmin };
}

export default connect(mapStateToProps)(withStyles(styles)(DiscussionCard));
