import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ApplicationBar from './ApplicationBar';
import MenuDrawer from './MenuDrawer';
// import HomeRoutes from './HomeRoutes';
import CreateInstitutionPage from '../CreateInstitutionPage';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
          </MainContainer>
        </ContentContainer>
      </Wrapper>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
