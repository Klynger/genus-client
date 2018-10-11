import UserMenu from './UserMenu';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { selectInstitution } from '../../actions/institution';
import {
  AppBar, Toolbar, IconButton,
  Typography, MenuItem,
  Button, Select,
} from '@material-ui/core';

const USER_MENU_ID = 'appbar__user-menu';

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
  }

  handleOpenUserMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleCloseUserMenu = () => {
    this.setState({ anchorEl: null });
  }

  goToRoute = (path = '/') => {
    this.props.history.push(path);
  }

  handleInstitutionSelectToggle = () => {
    this.setState(({ institutionSelectOpen }) =>
      ({ institutionSelectOpen: !institutionSelectOpen }));
  }

  handleSelectInstitutionChange = (event) => {
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
            aria-owns={open ? USER_MENU_ID : null}
            aria-haspopup="true"
            onClick={this.handleOpenUserMenu}
            color="inherit"
          >
            <AccountCircle className={classes.userIcon} />
          </IconButton>
          <UserMenu
            anchorEl={anchorEl}
            menuId={USER_MENU_ID}
            onClose={this.handleCloseUserMenu}
          />
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

function mapDispatchToProps(dispatch) {
  return {
    selectInstitution: id => dispatch(selectInstitution(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(withRouter(ApplicationBar)));
