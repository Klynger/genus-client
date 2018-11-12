import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReplyCard from './ReplyCard';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  replyItem: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
  },
});

const RepliesList = ({ classes, className, replies }) => (
  <ul className={classNames(classes.root, className)}>
    {replies.map(reply => (
      <ReplyCard key={reply.id} reply={reply} className={classes.replyItem} />
    ))}
  </ul>
);

RepliesList.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  replies: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(styles)(RepliesList);
