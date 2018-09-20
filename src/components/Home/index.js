import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ApplicationBar from './ApplicationBar';
import MenuDrawer from './MenuDrawer';
import HomeRoutes from './HomeRoutes';
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

const MainContainer = styled.main`
  align-items: center;
  background-color: inherit;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  width: 100%;
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { openDrawer: false };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleActiveDrawerToggle = this.handleActiveDrawerToggle.bind(this);
  }

  componentDidMount() {
    const { getLoggedUser, getInstitutions } = this.props;

    getLoggedUser()
      .then((res) => {
        getInstitutions(res.data.data.findLoggedUser.id);
      });
  }

  handleDrawerToggle() {
    this.setState(({ openDrawer }) => ({ openDrawer: !openDrawer }));
  }

  handleActiveDrawerToggle() {
    this.handleDrawerToggle();
  }


  render() {
    const { openDrawer } = this.state;
    return (
      <Wrapper>
        <ApplicationBar onDrawerToggle={this.handleActiveDrawerToggle} />
        <ContentContainer>
          <MenuDrawer
            onDrawerToggle={this.handleActiveDrawerToggle}
            open={openDrawer}
          />
          <MainContainer>
            <HomeRoutes />
          </MainContainer>
        </ContentContainer>
      </Wrapper>
    );
  }
}

Home.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
