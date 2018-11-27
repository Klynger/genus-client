import UserMenu from './UserMenu';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Notification from '../Notification';
import { withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Notifications from '@material-ui/icons/Notifications';
import { selectInstitution } from '../../actions/institution';
import { NO_INSTUTION_SELECTED } from '../../reducers/institution';
import {
  AppBar,
  Badge,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Button,
  Select,
} from '@material-ui/core';

const USER_MENU_ID = 'appbar__user-menu';
const NOTIFICATION_MENU_ID = 'appbar_notification-menu';

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
  notificationIcon: {
    color: theme.palette.common.white,
  },
  selectRoot: {
    color: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 250,
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 200,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 110,
    },
  },
  selectIcon: {
    color: theme.palette.common.white,
  },
});

class ApplicationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      anchorNotificationEl: null,
      institutionSelectOpen: false,
    };
  }

  handleOpenUserMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseUserMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleOpenNotificationMenu = event => {
    this.setState({ anchorNotificationEl: event.currentTarget });
  };

  handleCloseNotificationMenu = () => {
    this.setState({ anchorNotificationEl: null });
  };

  goToRoute = (path = '/') => {
    this.props.history.push(path);
  };

  handleInstitutionSelectToggle = () => {
    this.setState(({ institutionSelectOpen }) => ({
      institutionSelectOpen: !institutionSelectOpen,
    }));
  };

  handleSelectInstitutionChange = event => {
    this.props.selectInstitution(event.target.value);
  };

  renderInstitutionMenu() {
    const { institutions, selectedInstitution, classes } = this.props;
    const { institutionSelectOpen } = this.state;
    if (institutions.length > 0) {
      return (
        <Select
          open={institutionSelectOpen}
          onClose={this.handleInstitutionSelectToggle}
          onOpen={this.handleInstitutionSelectToggle}
          onChange={this.handleSelectInstitutionChange}
          value={selectedInstitution.id}
          classes={{
            root: classes.selectRoot,
            icon: classes.selectIcon,
          }}
        >
          {institutions.map(institution => (
            <MenuItem value={institution.id} key={institution.id}>
              {institution.name}
            </MenuItem>
          ))}
        </Select>
      );
    }

    return (
      <Button color="inherit" onClick={() => this.goToRoute('/institution/new')}>
        Adicionar Instituição
      </Button>
    );
  }

  render() {
    const { classes, onDrawerToggle, notificationQuantity } = this.props;
    const { anchorEl, anchorNotificationEl } = this.state;
    const open = Boolean(anchorEl);
    const openNotificationMenu = Boolean(anchorNotificationEl);

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
          <Typography className={classes.appTitle} variant="h6" color="textSecondary">
            Genus
          </Typography>
          {this.renderInstitutionMenu()}
          <IconButton
            aria-owns={openNotificationMenu ? NOTIFICATION_MENU_ID : null}
            aria-haspopup="true"
            onClick={this.handleOpenNotificationMenu}
            color="inherit"
          >
            <Badge badgeContent={notificationQuantity} color="secondary">
              <Notifications className={classes.notificationIcon} />
            </Badge>
          </IconButton>
          <Notification
            anchorEl={anchorNotificationEl}
            menuId={NOTIFICATION_MENU_ID}
            onClose={this.handleCloseNotificationMenu}
          />
          <IconButton
            aria-owns={open ? USER_MENU_ID : null}
            aria-haspopup="true"
            onClick={this.handleOpenUserMenu}
            color="inherit"
          >
            <AccountCircle className={classes.userIcon} />
          </IconButton>
          <UserMenu anchorEl={anchorEl} menuId={USER_MENU_ID} onClose={this.handleCloseUserMenu} />
        </Toolbar>
      </AppBar>
    );
  }
}

ApplicationBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  institutions: PropTypes.array,
  notificationQuantity: PropTypes.number,
  onDrawerToggle: PropTypes.func.isRequired,
  selectedInstitution: PropTypes.object,
  selectInstitution: PropTypes.func.isRequired,
};

ApplicationBar.defaultProps = {
  institutions: [],
  notificationQuantity: 0,
};

function mapStateToProps({ institution, user }) {
  const { allIds, byId, selectedInstitution } = institution;
  if (selectedInstitution !== NO_INSTUTION_SELECTED && user.byId[user.loggedUserId]) {
    const notificationQuantity = user.byId[user.loggedUserId].notifications
      ? user.byId[user.loggedUserId].notifications.filter(notification => !notification.read).length
      : 0;
    return {
      institutions: allIds.map(id => byId[id]),
      selectedInstitution: byId[selectedInstitution],
      notificationQuantity,
    };
  }

  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    selectInstitution: id => dispatch(selectInstitution(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(withRouter(ApplicationBar)));
