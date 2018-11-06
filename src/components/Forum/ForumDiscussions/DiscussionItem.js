import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardHeader, Avatar } from '@material-ui/core';
import classNames from 'classnames';
import { getFirstInitialsCapitalized } from '../../utils/helpers';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { Link, withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    borderRadius: 0,
    cursor: 'pointer',
    textDecoration: 'none',
    width: `calc(100% - ${theme.spacing.unit * 2}px)`,
    transition: 'background-color 150ms ease',
    '&:hover': {
      backgroundColor: '#ddd',
    },
    '&:active': {
      backgroundColor: '#ccc',
    },
  },
  avatar: {
    backgroundColor: deepOrange.A400,
  },
});

const Discussionitem = ({ classes, discussion, className: classNameProp }) => (
  <Card className={classNames(classes.root, classNameProp)} to="/" component={Link}>
    <CardHeader
      avatar={
        <Avatar className={classes.avatar}>
          {getFirstInitialsCapitalized(discussion.creator.username)}
        </Avatar>
      }
      title={discussion.title}
      subheader={discussion.creator.username}
    />
  </Card>
);

Discussionitem.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  discussion: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Discussionitem));
