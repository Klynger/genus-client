import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import classNames from 'classnames/bind';
import { withRouter, Link } from 'react-router-dom';
import { NO_USER_LOGGED } from '../../reducers/user';
import { readNotification } from '../../actions/discussion';
import { Divider, Menu, MenuItem, withStyles, withWidth } from '@material-ui/core';

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

const styles = theme => ({
  menu: {
    maxHeight: '400px',
    [theme.breakpoints.up('sm')]: {
      minWidth: '400px',
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '250px',
    },
  },
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
});

const getNotificationMessage = (message, width) => {
  let len = message.length;
  if (width === 'xs' && message.length >= 17) {
    len = 17;
  } else if (message.length >= 35) {
    len = 35;
  }
  return message.length === len ? message : message.slice(0, len).concat('...');
};

const NotificationList = ({
  anchorEl,
  classes,
  menuId,
  notifications,
  onClose,
  readNotificationById,
  width,
}) => {
  const open = Boolean(anchorEl);
  const menuItemClasses = classNames.bind(classes);

  return (
    <Fragment>
      <Menu
        classes={{
          paper: classes.menu,
        }}
        disableAutoFocusItem
        anchorEl={anchorEl}
        id={menuId}
        onClose={onClose}
        open={open}
      >
        {notifications &&
          notifications.map((notification, index) => (
            <span key={notification.id}>
              {index === 0 && <Divider />}
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
              <Divider />
            </span>
          ))}
        {notifications.length === 0 && <MenuItem disabled>Não Possui Notificação</MenuItem>}
      </Menu>
    </Fragment>
  );
};

NotificationList.propTypes = {
  anchorEl: PropTypes.object,
  classes: PropTypes.object.isRequired,
  menuId: PropTypes.string.isRequired,
  notifications: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  readNotificationById: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
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
)(withStyles(styles)(withWidth()(withRouter(NotificationList))));
