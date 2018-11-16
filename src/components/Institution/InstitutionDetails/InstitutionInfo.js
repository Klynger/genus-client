import PropTypes from 'prop-types';
import { MoreVert } from '@material-ui/icons';
import React, { Component, Fragment } from 'react';
import InstitutionInfoMenu from './InstitutionInfoMenu';
import { Paper, Typography, withStyles, IconButton } from '@material-ui/core';

const photoDimension = 140;

const contentContainerBreakpoints = theme => ({
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing.unit * 3,
  },
});

const styles = theme => ({
  informationsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: `calc(100% - ${photoDimension}px - ${theme.spacing.unit * 6}px - 48px)`,
    },
  },
  photo: {
    height: photoDimension,
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    width: photoDimension,
    ...contentContainerBreakpoints(theme),
  },
  detailsPageContentContainer: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit,
    position: 'relative',
    width: `calc(100% - ${theme.spacing.unit * 2}px)`,
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
  menuIcon: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: 0,
    top: 0,
    height: 48,
    width: 48,
  },
});

class InstitutionInfo extends Component {
  constructor(props) {
    super(props);

    this.menuId = 'institution-info__menu';
    this.state = {
      openMenu: false,
    };
  }

  handleMenuToggle = () => {
    this.setState(({ openMenu }) => ({ openMenu: !openMenu }));
  };

  handleMenuClose = e => {
    if (this.menuAnchorEl.contains(e.target)) {
      return;
    }
    this.setState({ openMenu: false });
  };

  render() {
    const {
      classes,
      institution,
      canUpdateInfo,
      canGenerateCode,
      onGenerateCodeOpen,
      onUpdateInstitutionOpen,
    } = this.props;

    const { openMenu } = this.state;

    const showMenuButton = canGenerateCode || canUpdateInfo;

    return (
      <Fragment>
        <InstitutionInfoMenu
          open={openMenu}
          id={this.menuId}
          anchorEl={this.menuAnchorEl}
          canUpdateInfo={canUpdateInfo}
          onClose={this.handleMenuClose}
          canGenerateCode={canGenerateCode}
          onGenerateCodeOpen={onGenerateCodeOpen}
          onUpdateInstitutionOpen={onUpdateInstitutionOpen}
        />
        <Paper className={classes.root}>
          {showMenuButton && (
            <IconButton
              aria-haspopup="true"
              className={classes.menuIcon}
              onClick={this.handleMenuToggle}
              aria-owns={openMenu ? this.menuId : undefined}
              buttonRef={node => {
                this.menuAnchorEl = node;
              }}
            >
              <MoreVert />
            </IconButton>
          )}
          <div className={classes.detailsPageContentContainer}>
            <img
              alt="Institution"
              className={classes.photo}
              src="https://s3.amazonaws.com/tinycards/image/f8bda7d1c863b4f42adf2d1e5d72ff14"
            />
            <div className={classes.informationsContainer}>
              <Typography component="h2" variant="h6" gutterBottom>
                {institution.name}
              </Typography>
              <Typography component="span" variant="subtitle1" gutterBottom>
                Email: {institution.email}
              </Typography>
              <Typography component="span" variant="subtitle1" gutterBottom>
                Telefone: {institution.phone}
              </Typography>
              <Typography component="span" gutterBottom variant="subtitle1">
                Endereço: {institution.address}
              </Typography>
            </div>
          </div>
        </Paper>
      </Fragment>
    );
  }
}

InstitutionInfo.defaultProps = {
  canGenerateCode: false,
  canUpdateInfo: false,
};

InstitutionInfo.propTypes = {
  canGenerateCode: PropTypes.bool,
  canUpdateInfo: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  institution: PropTypes.shape({
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  onGenerateCodeOpen: PropTypes.func.isRequired,
  onUpdateInstitutionOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(InstitutionInfo);
