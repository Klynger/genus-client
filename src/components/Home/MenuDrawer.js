import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';

const MenuDrawer = ({ open, onDrawerToggle }) => (
  <Drawer
    open={open}
    onClose={onDrawerToggle}
  >
    Drawer works
  </Drawer>
);

MenuDrawer.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

MenuDrawer.defaultProps = {
  open: false,
};

export default MenuDrawer;
