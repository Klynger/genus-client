import UserList from './UserList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GradesGrid from './GradesGrid';
import { Fade } from '@material-ui/core';
import React, { Component } from 'react';
import InstitutionInfo from './InstitutionInfo';
import EditInstitutionDialog from './EditInstitutionDialog';
import DisplayCodeDialog from '../EntryCode/DisplayCodeDialog';
import GenerateCodeDialog from '../EntryCode/GenerateCodeDialog';
import DefaultContainerRoute from '../../shared/DefaultContainerRoute';

class InstitutionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generateCodeOpen: false,
      currentGeneratedCode: null,
      displayCodeOpen: false,
      displayUpdateOpen: false,
    };
  }

  handleDisplayCodeClose = () => {
    this.setState({ displayCodeOpen: false });
  };

  handleGenerateCodeClose = (currentGeneratedCode = null) => {
    if (currentGeneratedCode && typeof currentGeneratedCode === 'string') {
      this.setState({
        generateCodeOpen: false,
        displayCodeOpen: true,
        currentGeneratedCode,
      });
    } else {
      this.setState({ generateCodeOpen: false });
    }
  };

  handleGenerateCodeOpen = () => {
    this.setState({ generateCodeOpen: true });
  };

  handleUpdateInstitutionOpen = () => {
    this.setState({ displayUpdateOpen: true });
  };

  handleUpdateInstitutionClose = () => {
    this.setState({ displayUpdateOpen: false });
  };

  render() {
    const { institution, loggedUserId } = this.props;
    const {
      displayCodeOpen,
      displayUpdateOpen,
      generateCodeOpen,
      currentGeneratedCode,
    } = this.state;
    let toRender;

    if (institution) {
      const loggedUserIsAdmin = institution.admins.some(({ id }) => id === loggedUserId);

      toRender = (
        <DefaultContainerRoute>
          <DisplayCodeDialog
            open={displayCodeOpen}
            code={currentGeneratedCode}
            onClose={this.handleDisplayCodeClose}
          />
          {loggedUserIsAdmin && (
            <GenerateCodeDialog
              open={generateCodeOpen}
              institutionId={institution.id}
              onClose={this.handleGenerateCodeClose}
            />
          )}
          {loggedUserIsAdmin && (
            <EditInstitutionDialog
              open={displayUpdateOpen}
              onClose={this.handleUpdateInstitutionClose}
            />
          )}
          <InstitutionInfo
            institution={institution}
            canUpdateInfo={loggedUserIsAdmin}
            canGenerateCode={loggedUserIsAdmin}
            onGenerateCodeOpen={this.handleGenerateCodeOpen}
            onUpdateInstitutionOpen={this.handleUpdateInstitutionOpen}
          />
          <GradesGrid />
          <UserList users={institution.teachers} headTitle="Professores" />
          <UserList users={institution.admins} headTitle="Administradores" />
          <UserList users={institution.students} headTitle="Alunos" />
        </DefaultContainerRoute>
      );
    } else {
      toRender = <p>Não há nenhuma instituição selecionada</p>;
    }

    return <Fade in>{toRender}</Fade>;
  }
}

InstitutionDetails.propTypes = {
  institution: PropTypes.shape({
    address: PropTypes.string,
    admins: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }),
    ),
    email: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    students: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }),
    ),
    teachers: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }),
    ),
  }),
  loggedUserId: PropTypes.string.isRequired,
};

function mapStateToProps({ institution, user }) {
  const { selectedInstitution } = institution;
  if (institution.byId[selectedInstitution]) {
    return {
      institution: {
        ...institution.byId[selectedInstitution],
        admins: institution.byId[selectedInstitution].admins
          .filter(id => user.byId[id])
          .map(id => user.byId[id]),
        students: institution.byId[selectedInstitution].students
          .filter(id => user.byId[id])
          .map(id => user.byId[id]),
        teachers: institution.byId[selectedInstitution].teachers
          .filter(id => user.byId[id])
          .map(id => user.byId[id]),
      },
      loggedUserId: user.loggedUserId,
    };
  }
  return {
    loggedUserId: user.loggedUserId,
  };
}

export default connect(mapStateToProps)(InstitutionDetails);
