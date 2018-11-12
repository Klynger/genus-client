import AddReply from './AddReply';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import React, { Component, Fragment } from 'react';
import ImageUploader from '../../shared/ImageUploader';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { Edit, Delete, MoreVert, Reply } from '@material-ui/icons';
import { getFirstInitialsCapitalized } from '../../../utils/helpers';
import {
  Card,
  Divider,
  withStyles,
  IconButton,
  CardHeader,
  CardActions,
  CardContent,
} from '@material-ui/core';

const ReplyCardActions = ({ classes, onReplyClick }) => (
  <CardActions disableActionSpacing className={classes.actions}>
    <IconButton aria-label="delete">
      <Delete />
    </IconButton>
    <IconButton aria-label="edit">
      <Edit />
    </IconButton>
    <IconButton aria-label="reply" onClick={onReplyClick}>
      <Reply />
    </IconButton>
  </CardActions>
);

ReplyCardActions.propTypes = {
  classes: PropTypes.object.isRequired,
  onReplyClick: PropTypes.func.isRequired,
};

const styles = theme => ({
  avatar: {
    backgroundColor: deepOrange.A400,
  },
  contentReplied: {
    backgroundColor: theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius,
    fontStyle: 'italic',
    padding: theme.spacing.unit,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

class ReplyCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openAddReply: false,
    };
  }

  handleToggleAddReply = () => {
    this.setState(({ openAddReply }) => ({ openAddReply: !openAddReply }));
  };

  handleCloseAddReply = () => {
    this.setState({ openAddReply: false });
  };

  render() {
    const { classes, className, reply } = this.props;
    const { openAddReply } = this.state;

    let contentReplied;
    if (reply.parent) {
      contentReplied = reply.parent.content;
    }

    return (
      <Fragment>
        <Card className={classNames(classes.root, className)} component="li">
          <CardHeader
            avatar={
              <ImageUploader
                className={classes.avatar}
                alt={getFirstInitialsCapitalized(reply.user.username)}
                initials={getFirstInitialsCapitalized(reply.user.username)}
              />
            }
            actions={
              <IconButton>
                <MoreVert />
              </IconButton>
            }
            title={reply.user.username}
            subheader={reply.date}
          />
          <Divider light />
          <CardContent>
            {contentReplied && (
              <div className={classes.contentReplied}>
                <ReactMarkdown escapeHtml source={contentReplied} />
              </div>
            )}
            <ReactMarkdown escapeHtml source={reply.content} />
          </CardContent>
          <ReplyCardActions classes={classes} onReplyClick={this.handleToggleAddReply} />
        </Card>
        {openAddReply && (
          <AddReply
            isReplyToReply
            componentRoot="li"
            parentId={reply.id}
            key={`${reply.id}__add-reply`}
            onClose={this.handleCloseAddReply}
            onSubmit={this.handleCloseAddReply}
          />
        )}
      </Fragment>
    );
  }
}

ReplyCard.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  reply: PropTypes.shape({
    content: PropTypes.string,
    date: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default withStyles(styles)(ReplyCard);
