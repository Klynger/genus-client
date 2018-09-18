import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import ApplicationBar from './ApplicationBar';
import MenuDrawer from './MenuDrawer';


const Wrapper = styled.div`
  align-items: center;
  background-color: inherit;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  width: 100%;
`;


const ContentContainer = styled.div`
`;

const MainContainer = styled.div`
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDrawer: true,
    };

    // this.handleDrawerToggle.bind(this);
    // this.handleActiveDrawerToggle.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState(({ openDrawer }) => ({ openDrawer: !openDrawer }));
  }

  handleActiveDrawerToggle = () => {
    this.handleDrawerToggle();
  }

  render() {
    // const { classes } = this.props;
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
            Home works
          </MainContainer>
        </ContentContainer>
      </Wrapper>
    );
  }
}

// Home.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default Home;
