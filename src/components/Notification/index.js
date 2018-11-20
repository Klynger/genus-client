import React from 'react';
import PropTypes from 'prop-types';
import NotificationList from './NotificationList';

const NotificationMenu = ({ anchorEl, menuId, onClose }) => (
  <NotificationList anchorEl={anchorEl} menuId={menuId} onClose={onClose} />
);

NotificationMenu.propTypes = {
  anchorEl: PropTypes.object,
  menuId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationMenu;
