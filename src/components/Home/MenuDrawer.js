import React from 'react';
import PropTypes from 'prop-types';
import { SwipeableDrawer } from '@material-ui/core';
import DrawerContent from './DrawerContent';

const MenuDrawer = ({ open, onDrawerToggle }) => (
  <SwipeableDrawer
    open={open}
    onClose={onDrawerToggle}
    onOpen={onDrawerToggle}
  >
    <DrawerContent onDrawerToggle={onDrawerToggle} />
  </SwipeableDrawer>
);

MenuDrawer.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

MenuDrawer.defaultProps = {
  open: false,
};

export default MenuDrawer;
