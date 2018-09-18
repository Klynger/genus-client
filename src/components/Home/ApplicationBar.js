import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton,
  Typography, MenuItem, Menu,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styled from 'styled-components';

const CustomIconButton = styled(IconButton)`
  margin-left: -12px;
  margin-right: 20px;
`;

const FlexTypo = styled(Typography)`
  flex: 1;
`;

const styles = theme => ({
  userIcon: {
    color: theme.palette.common.white,
  },
  // iconButton: {
  //   marginLeft: -12,
  //   marginRight: 20,
  // },
});

class ApplicationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };

    this.handleMenu.bind(this);
    this.handleLogout.bind(this);
    this.handleClose.bind(this);
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleLogout() {
    const { history } = this.props;

    this.handleClose();
    localStorage.removeItem('token');
    history.push('/landing');
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes, onDrawerToggle } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="fixed">
        <Toolbar>
          <CustomIconButton
            color="inherit"
            aria-label="Menu"
            onClick={onDrawerToggle}
          >
            <MenuIcon />
          </CustomIconButton>
          <FlexTypo>
            <div>
              <IconButton
                aria-owns={open ? 'appbar__user-menu' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle className={classes.userIcon} />
              </IconButton>
              <Menu
                id="appbar__user-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </FlexTypo>
        </Toolbar>
      </AppBar>
    );
  }
}

ApplicationBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ApplicationBar));
