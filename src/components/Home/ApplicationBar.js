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

const styles = theme => ({
  appTitle: {
    color: theme.palette.common.white,
    flex: 1,
  },
  iconButton: {
    marginLeft: -theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  userIcon: {
    color: theme.palette.common.white,
  },
});

class ApplicationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
          <IconButton
          className={classes.iconButton}
            color="inherit"
            aria-label="Menu"
            onClick={onDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.appTitle} color="textSecondary">Genus</Typography>
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
        </Toolbar>
      </AppBar>
    );
  }
}

ApplicationBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(withRouter(ApplicationBar));
