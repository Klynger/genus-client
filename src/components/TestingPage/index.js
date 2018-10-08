import React from 'react';
// import styled from 'styled-components';
// import { Button } from '@material-ui/core';
// import CreateEntryCodeDialog from '../InstitutionPage/EntryCode/CreateEntryCodeDialog';
import EmployeeList from '../InstitutionPage/DetailsPage/employeeList';

// const LandingContainer = styled.div`
//   align-items: center;
//   display: flex;
//   height: 100%;
//   justify-content: center;
//   min-height: 100vh;
//   min-width: 100vw;
//   width: 100%;
// `;

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

    // this.state = {
    //   openCreate: false,
    // };

    this.handleOpenCreateToggle = this.handleOpenCreateToggle.bind(this);
  }

  handleOpenCreateToggle() {
    this.setState(({ openCreate }) => ({ openCreate: !openCreate }));
  }


  render() {
    // const { openCreate } = this.state;

    const employees = [
      {
        username: 'teste',
        email: 'teste@teste.com',
      },
      {
        username: 'teste1',
        email: 'teste@teste.com',
      },
      {
        username: 'teste2',
        email: 'teste@teste.com',
      },
      {
        username: 'teste3',
        email: 'teste@teste.com',
      },
      {
        username: 'teste4',
        email: 'teste@teste.com',
      },
      {
        username: 'teste5',
        email: 'teste@teste.com',
      },
      {
        username: 'teste6',
        email: 'teste@teste.com',
      },
      {
        username: 'teste7',
        email: 'teste@teste.com',
      },
    ];

    return (
      <EmployeeList employees={employees} headTitle="Professor" />
    );
  }
}

export default TestingPage;
