import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { getFirstInitialsCapitalized } from '../../../utils/helpers';
import { withStyles, Card, CardHeader, Avatar } from '@material-ui/core';

const styles = () => ({
  root: {
    width: '100%',
  },
  card: {
    borderRadius: 0,
    cursor: 'pointer',
    textDecoration: 'none',
    width: '100%',
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

// TODO render this component inside a li element
const Discussionitem = ({ classes, discussion, className: classNameProp, history }) => {
  return (
    <Card
      className={classNames(classes.card, classNameProp)}
      to={`${history.location.pathname}/discussion/${discussion.id}`}
      component={Link}
    >
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
};

Discussionitem.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  discussion: PropTypes.object.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withStyles(styles)(withRouter(Discussionitem));
