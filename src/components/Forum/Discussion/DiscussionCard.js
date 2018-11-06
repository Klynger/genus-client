import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import ImageUploader from '../../utils/ImageUploader';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { getFirstInitialsCapitalized } from '../../utils/helpers';
import { Edit, Delete, MoreVert, Reply } from '@material-ui/icons';
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
    borderRadius: 0,
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
};

const DiscussionActionButtons = ({ classes }) => (
  <CardActions disableActionSpacing className={classes.actions}>
    <IconButton aria-label="delete">
      <Delete />
    </IconButton>
    <IconButton aria-label="edit">
      <Edit />
    </IconButton>
    <IconButton aria-label="reply">
      <Reply />
    </IconButton>
  </CardActions>
);

DiscussionActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

const DiscussionCard = ({ classes, discussion }) => (
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
      subheader={discussion.creationDate}
    />
    <Divider light />
    <CardContent>
      <ReactMarkdown escapeHtml source={discussion.replies[0].content} />
    </CardContent>
    <DiscussionActionButtons classes={classes} />
    {/* TODO LIST OF REPLIES */}
  </Card>
);

DiscussionCard.propTypes = {
  classes: PropTypes.object.isRequired,
  discussion: PropTypes.shape({
    creationDate: PropTypes.string.isRequired,
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
};

export default withStyles(styles)(DiscussionCard);
