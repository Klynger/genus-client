import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HomeRoutes from './HomeRoutes';
import MenuDrawer from './MenuDrawer';
import React, { Component } from 'react';
import ApplicationBar from './ApplicationBar';
import { withStyles } from '@material-ui/core';
import { fetchLoggedUser } from '../../actions/user';
import { getRoleFromInstitution } from '../../utils/helpers';
import { fetchInstitutionsByOwner } from '../../actions/institution';

const styles = theme => ({
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'inherit',
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
  },
  contentContainer: {
    backgroundColor: 'inherit',
    display: 'flex',
    margin: theme.spacing.unit,
    width: '100%',
  },
  mainContainer: {
    alignItems: 'center',
    backgroundColor: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 70,
    width: '100%',
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { openDrawer: false };
  }

  componentDidMount() {
    const { getLoggedUser, getInstitutions } = this.props;

    getLoggedUser().then(() => {
      getInstitutions();
    });
  }

  handleDrawerToggle = () => {
    this.setState(({ openDrawer }) => ({ openDrawer: !openDrawer }));
  };

  handleActiveDrawerToggle = () => {
    this.handleDrawerToggle();
  };

  render() {
    const { openDrawer } = this.state;
    const { selectedInstitution, userId, classes } = this.props;

    let userRole = null;
    if (selectedInstitution && userId) {
      userRole = getRoleFromInstitution(userId, selectedInstitution);
    }

    return (
      <div className={classes.wrapper}>
        <ApplicationBar onDrawerToggle={this.handleActiveDrawerToggle} />
        <div className={classes.contentContainer}>
          <MenuDrawer onDrawerToggle={this.handleActiveDrawerToggle} open={openDrawer} />
          <main className={classes.mainContainer}>
            <HomeRoutes userRole={userRole} />
          </main>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  getInstitutions: PropTypes.func.isRequired,
  getLoggedUser: PropTypes.func.isRequired,
  selectedInstitution: PropTypes.object,
  userId: PropTypes.string,
};

function mapStateToProps({ user, institution }) {
  const result = {
    userId: user.loggedUserId,
  };

  if (institution.byId[institution.selectedInstitution]) {
    result.selectedInstitution = institution.byId[institution.selectedInstitution];
  }

  return result;
}

function mapDispatchToProps(dispatch) {
  return {
    getLoggedUser: () => dispatch(fetchLoggedUser()),
    getInstitutions: () => dispatch(fetchInstitutionsByOwner()),
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Home),
);
