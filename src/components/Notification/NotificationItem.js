import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { withRouter, Link } from 'react-router-dom';
import { readNotification } from '../../actions/discussion';
import { MenuItem, withStyles, withWidth } from '@material-ui/core';

const styles = {
  notificationWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 'calc(100% + 8px)',
  },
  menuItem: {
    width: '100%',
    padding: '10px 16px',
    height: '45px',
  },
  notificationContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  subHeader: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  readed: {
    opacity: '0.7',
  },
  notificationActionsContainer: {
    backgroundColor: 'inherit',
    transform: 'translate(-28px, 0)',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  markAsReadBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
    borderRadius: '50%',
    height: '8px',
    width: '8px',
    position: 'relative',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.54)',
    },
  },
  markAsunreadBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
    borderRadius: '50%',
    height: '8px',
    width: '8px',
    position: 'relative',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.54)',
    },
    '&:before': {
      content: '""',
      backgroundColor: 'white',
      borderRadius: '50%',
      height: '4px',
      width: '4px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  },
};

const NotificationActions = ({ classes, markAsRead, readed }) => (
  <div className={classes.notificationActionsContainer}>
    <span
      role="button"
      className={readed ? classes.markAsunreadBtn : classes.markAsReadBtn}
      onMouseUp={markAsRead}
      tabIndex={0}
    />
  </div>
);

NotificationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  markAsRead: PropTypes.func.isRequired,
  readed: PropTypes.bool.isRequired,
};

const getNotificationMessage = (message, width) => {
  let len = message.length;
  if (width === 'xs' && message.length >= 17) {
    len = 17;
  } else if (message.length >= 35) {
    len = 35;
  }
  return message.length === len ? message : message.slice(0, len).concat('...');
};

const NotificationItem = ({ classes, notification, onClose, readNotificationById, width }) => {
  const menuItemClasses = classNames.bind(classes);
  return (
    <span className={classes.notificationWrapper}>
      <MenuItem
        classes={{
          root: classes.menuItem,
        }}
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
        <div
          className={menuItemClasses('notificationContent', {
            readed: notification.read,
          })}
        >
          <span>
            {notification.notificationType === 'NEW_DISCUSSION'
              ? 'Nova Discussão'
              : 'Novo Comentário'}
          </span>
          <span className={menuItemClasses({ subHeader: !notification.read })}>
            {getNotificationMessage(notification.message, width)}
          </span>
        </div>
      </MenuItem>
      <NotificationActions
        classes={classes}
        markAsRead={() => {
          if (!notification.read) {
            readNotificationById(notification.id);
          }
        }}
        readed={notification.read}
      />
    </span>
  );
};

NotificationItem.propTypes = {
  classes: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  readNotificationById: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    readNotificationById: input => dispatch(readNotification(input)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(withWidth()(withRouter(NotificationItem))));
