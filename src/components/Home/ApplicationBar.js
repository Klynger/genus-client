import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppBar, Toolbar, IconButton,
  Typography, MenuItem, Menu,
  Button, Select,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { selectInstitution } from '../../actions/institution';
import { clearStore } from '../../actions';

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
  selectUnderline: {
    borderBottomColor: 'red',
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
      institutionSelectOpen: false,
    };

    this.goToRoute = this.goToRoute.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleInstitutionSelectToggle = this.handleInstitutionSelectToggle.bind(this);
    this.handleSelectInstitutionChange = this.handleSelectInstitutionChange.bind(this);
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleLogout() {
    const { history, resetStore } = this.props;

    localStorage.removeItem('token');
    console.log('hereee', resetStore);
    resetStore();
    this.handleClose();
    history.push('/landing');
  }


  handleClose() {
    this.setState({ anchorEl: null });
  }

  goToRoute(path = '/') {
    this.props.history.push(path);
  }

  handleInstitutionSelectToggle() {
    this.setState(prevState => ({ institutionSelectOpen: !prevState.institutionSelectOpen }));
  }

  handleSelectInstitutionChange(event) {
    this.props.selectInstitution(event.target.value);
  }

  renderInstitutionMenu() {
    const { institutions, selectedInstitution, classes } = this.props;
    const { institutionSelectOpen } = this.state;
    if (institutions.length > 0 && selectedInstitution) {
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
            <MenuItem
              value={institution.id}
              key={institution.id}
            >
              {institution.name}
            </MenuItem>
          ))}
        </Select>
      );
    }

    return (
      <Button
        color="inherit"
        onClick={() => this.goToRoute('/institution/new')}
      >
        Adicionar Instituição
      </Button>
    );
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
          <Typography className={classes.appTitle} variant="title" color="textSecondary">
            Genus
          </Typography>
          {this.renderInstitutionMenu()}
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
            {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem> */}
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

ApplicationBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  institutions: PropTypes.array,
  onDrawerToggle: PropTypes.func.isRequired,
  resetStore: PropTypes.func.isRequired,
  selectedInstitution: PropTypes.object,
  selectInstitution: PropTypes.func.isRequired,
};

ApplicationBar.defaultProps = {
  institutions: [],
};

function mapStateToProps({ institution }) {
  const { allIds, byId, selectedInstitution } = institution;
  return {
    institutions: allIds.map(id => byId[id]),
    selectedInstitution: byId[selectedInstitution],
  };
}

function mapSDispatchToProps(dispatch) {
  return {
    selectInstitution: id => dispatch(selectInstitution(id)),
    resetStore: () => clearStore(dispatch),
  };
}

export default connect(mapStateToProps, mapSDispatchToProps)(
  withStyles(styles)(withRouter(ApplicationBar)));
