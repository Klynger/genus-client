import React from 'react';
import PropTypes from 'prop-types';
import DiscussionItem from './DiscussionItem';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  discussionItem: {
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

const DiscussionsList = ({ classes, className: classNameProp, discussions }) => (
  <ul className={classNames(classes.root, classNameProp)}>
    {discussions.map(discussion => (
      <DiscussionItem
        key={discussion.id}
        discussion={discussion}
        className={classes.discussionItem}
      />
    ))}
  </ul>
);

DiscussionsList.defaultProps = {
  discussions: [],
};

DiscussionsList.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  discussions: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(styles)(DiscussionsList);
