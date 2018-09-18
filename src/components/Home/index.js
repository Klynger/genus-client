import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ApplicationBar from './ApplicationBar';
import MenuDrawer from './MenuDrawer';
// import HomeRoutes from './HomeRoutes';
import CreateInstitutionPage from '../CreateInstitutionPage';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InstitutionDetailsPage from '../InstitutionDetailsPage';
import { fetchLoggedUser } from '../../actions/user';
import { fetchInstitutionsByOwner } from '../../actions/institution';

const Wrapper = styled.div`
  align-items: center;
  background-color: inherit;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  width: 100%;
`;


const ContentContainer = styled.div`
  bakcground-color: inherit;
  display: flex;
  margin: 7px;
  width: 100%;
`;

const MainContainer = styled.div`
  align-items: center;
  background-color: inherit;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  width: 100%;
`;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDrawer: false,
      openCreateInstitution: false,
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleActiveDrawerToggle = this.handleActiveDrawerToggle.bind(this);
    this.handleCreateInstitutionToggle = this.handleCreateInstitutionToggle.bind(this);
  }

  componentDidMount() {
    const { getLoggedUser, getInstitutions } = this.props;

    getLoggedUser()
      .then((res) => {
        getInstitutions(res.data.data.findLoggedUser.id);
      });
  }

  handleCreateInstitutionToggle() {
    this.setState(
      ({ openCreateInstitution }) => ({
        openCreateInstitution: !openCreateInstitution,
      }));
  }

  handleDrawerToggle() {
    this.setState(({ openDrawer }) => ({ openDrawer: !openDrawer }));
  }

  handleActiveDrawerToggle() {
    this.handleDrawerToggle();
  }


  render() {
    const { classes } = this.props;
    const { openDrawer, openCreateInstitution } = this.state;

    return (
      <Wrapper>
        <ApplicationBar onDrawerToggle={this.handleActiveDrawerToggle} />
        <ContentContainer>
          <MenuDrawer
            onDrawerToggle={this.handleActiveDrawerToggle}
            open={openDrawer}
          />
          <MainContainer>
            <Button
              className={classes.button}
              aria-label="Create a new institution"
              variant="extendedFab"
              onClick={this.handleCreateInstitutionToggle}
            >
              Create a New Institution
            </Button>
            <CreateInstitutionPage
              open={openCreateInstitution}
              onClose={this.handleCreateInstitutionToggle}
            />
            <InstitutionDetailsPage />
          </MainContainer>
        </ContentContainer>
      </Wrapper>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  getInstitutions: PropTypes.func.isRequired,
  getLoggedUser: PropTypes.func.isRequired,
};

function mapStateToProps({ user }) {
  return {
    userId: user.loggedUserId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getLoggedUser: () => dispatch(fetchLoggedUser()),
    getInstitutions: (ownerId) => dispatch(fetchInstitutionsByOwner(ownerId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
