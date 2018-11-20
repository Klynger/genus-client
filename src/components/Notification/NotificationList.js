import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { NO_USER_LOGGED } from '../../reducers/user';
import React, { PureComponent, Fragment } from 'react';
import { readNotification } from '../../actions/discussion';
import { Menu, MenuItem, withStyles } from '@material-ui/core';

const styles = {
  menu: {
    width: '260px',
  },
};

class NotificationList extends PureComponent {
  render() {
    const { anchorEl, classes, menuId, notifications, onClose, readNotificationById } = this.props;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <Menu
          className={classes.menu}
          anchorEl={anchorEl}
          id={menuId}
          onClose={onClose}
          open={open}
        >
          {notifications &&
            notifications.map(notification => (
              <MenuItem
                key={notification.id}
                component={Link}
                to={`/institution/grade/${notification.gradeId}/subject/${
                  notification.subjectId
                }/forum/discussion/${notification.discussionId}`}
                onClick={() => {
                  onClose();
                  if (!notification.read) {
                    readNotificationById(notification.id);
                  }
                }}
              >
                {notification.message.length >= 20
                  ? notification.message.slice(0, 16).concat('...')
                  : notification.message}
              </MenuItem>
            ))}
          {notifications.length === 0 && <MenuItem disabled>Não Possui Notificação</MenuItem>}
        </Menu>
      </Fragment>
    );
  }
}

NotificationList.propTypes = {
  anchorEl: PropTypes.object,
  classes: PropTypes.object.isRequired,
  menuId: PropTypes.string.isRequired,
  notifications: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  readNotificationById: PropTypes.func.isRequired,
};

NotificationList.defaultProps = {
  notifications: [],
};

function mapStateToProps({ user }) {
  let notifications = [];
  if (user.loggedUserId !== NO_USER_LOGGED) {
    notifications = user.byId[user.loggedUserId].notifications;
  }
  return { notifications };
}

function mapDispatchToProps(dispatch) {
  return {
    readNotificationById: input => dispatch(readNotification(input)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(withRouter(NotificationList)));
