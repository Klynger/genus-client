import React from 'react';
import styled from 'styled-components';
// import { Button } from '@material-ui/core';
// import CreateEntryCodeDialog from '../InstitutionPage/EntryCode/CreateEntryCodeDialog';
import UserList from '../InstitutionPage/DetailsPage/UserList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestGraphql } from '../utils/HTTPClient';
import { getUsersFromInstitutionByRole } from '../../queryGenerators/userQueries';

// const LandingContainer = styled.div`
//   align-items: center;
//   display: flex;
//   height: 100%;
//   justify-content: center;
//   min-height: 100vh;
//   min-width: 100vw;
//   width: 100%;
// `;

const LandingContainer = styled.div`
  width: 70%;
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
      admins: [],
      teachers: [],
    };

    this.fetchData = this.fetchData.bind(this);
    // this.handleOpenCreateToggle = this.handleOpenCreateToggle.bind(this);
  }

  // handleOpenCreateToggle() {
  //   this.setState(({ openCreate }) => ({ openCreate: !openCreate }));
  // }

  componentDidMount() {
    if (this.props.institutionId) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.institutionId !== prevProps.institutionId) {
      this.fetchData();
    }
  }

  fetchData() {
    const teacherInput = {
      institutionId: this.props.institutionId,
      role: 'TEACHER',
    };
    requestGraphql(getUsersFromInstitutionByRole(teacherInput), localStorage.getItem('token'))
      .then(res => {
        if (res.data.data && res.data.data.getUsersFromInstitutionByRole) {
          this.setState({ teachers: [...res.data.data.getUsersFromInstitutionByRole] });
        } else {
          // TODO error treatment
        }
      })
      .catch();
    const adminInput = {
      institutionId: this.props.institutionId,
      role: 'ADMIN',
    };
    requestGraphql(getUsersFromInstitutionByRole(adminInput), localStorage.getItem('token'))
      .then(res => {
        if (res.data.data && res.data.data.getUsersFromInstitutionByRole) {
          this.setState({ admins: [...res.data.data.getUsersFromInstitutionByRole] });
        } else {
          // TODO error treatment
        }
      })
      .catch();
  }

  render() {
    const { teachers, admins } = this.state;
    return (
      <LandingContainer>
        <UserList users={teachers} headTitle="Professores" />
        <UserList users={admins} headTitle="Administradores" />
      </LandingContainer>
    );
  }
}

TestingPage.propTypes = {
  institutionId: PropTypes.string.isRequired,
};

function mapStateToProps({ institution }) {
  return {
    institutionId: institution.selectedInstitution,
  };
}

export default connect(mapStateToProps)(TestingPage);
