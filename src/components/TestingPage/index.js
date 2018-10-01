import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import CreateEntryCodeDialog from '../InstitutionPage/EntryCode/CreateEntryCodeDialog';

const LandingContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
  width: 100%;
`;

// const TestingPage = () => {
//   return (
//     <LandingContainer>
//       <Button variant="extendedFab" color="primary">
//         Criar Código
//       </Button>
//     </LandingContainer>
//   );
// };

class TestingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openCreate: false,
    };

    this.handleOpenCreateToggle = this.handleOpenCreateToggle.bind(this);
  }

  handleOpenCreateToggle() {
    this.setState(({ openCreate }) => ({ openCreate: !openCreate }));
  }


  render() {
    const { openCreate } = this.state;
    return (
      <LandingContainer>
        <CreateEntryCodeDialog
          open={openCreate}
          onClose={this.handleOpenCreateToggle}
        />
        <Button
          variant="extendedFab"
          color="primary"
          onClick={this.handleOpenCreateToggle}
        >
          Criar Código
        </Button>
      </LandingContainer>
    );
  }
}

export default TestingPage;
