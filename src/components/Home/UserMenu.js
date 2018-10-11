import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearStore } from '../../actions';
import { withRouter } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AssociateDialog from '../InstitutionPage/EntryCode/AssociateDialog';

const styles = () => ({
  userMenu: {
    minWidth: 200,
  },
});

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      associateDialogOpen: false,
    };
  }

  handleLogout = () => {
    const { onClose, resetStore } = this.props;

    localStorage.removeItem('token');
    resetStore();
    onClose();
    this.goToRoute('/landing');
  }

  goToRoute = (path = '/') => {
    this.props.history.push(path);
  }

  handleAssociateOpenToggle = () => {
    this.setState(({ associateDialogOpen }) =>
    ({ associateDialogOpen: !associateDialogOpen }));
  }

  render() {
    const {
      anchorEl, classes, onClose,
      menuId,
    } = this.props;
    const { associateDialogOpen } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <AssociateDialog
          open={associateDialogOpen}
          onClose={this.handleAssociateOpenToggle}
        />
        <Menu
          id={menuId}
          classes={{ paper: classes.userMenu }}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={onClose}
        >
          {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem> */}
          <MenuItem
            onClick={this.handleAssociateOpenToggle}
          >
            Vincular a uma instituição
          </MenuItem>
          <MenuItem onClick={this.handleLogout}>Sair</MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

UserMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  menuId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  resetStore: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    resetStore: () => clearStore(dispatch),
  };
}

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(withRouter(UserMenu)));
