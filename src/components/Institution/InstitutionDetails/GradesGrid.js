import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GridButton from '../../shared/GridButton';
import CreateGradeDialog from '../CreateGradeDialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GridCard, { CardLine } from '../../shared/GridCard';
import { defaultImagesPaths } from '../../../utils/constants';
import { NO_INSTUTION_SELECTED } from '../../../reducers/institution';
import { GridContainer, ResponsiveSubTitle } from '../../shared/SharedComponents';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

class GradesGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createGradeOpen: false,
    };
  }

  handleCreateGradeOpen = () => {
    this.setState({ createGradeOpen: true });
  };

  handleCreateGradeClose = () => {
    this.setState({ createGradeOpen: false });
  };

  goToGrade = gradeId => {
    this.props.history.push(`/institution/grade/${gradeId}`);
  };

  render() {
    const { grades, userRole } = this.props;
    const { createGradeOpen } = this.state;

    return (
      <Container>
        <ResponsiveSubTitle>Séries</ResponsiveSubTitle>
        <GridContainer>
          <CreateGradeDialog open={createGradeOpen} onClose={this.handleCreateGradeClose} />
          {grades.map(({ id, name, subjects, qntStudents, qntTeachers, mimeType, photo }) => (
            <GridCard
              key={id}
              title={name}
              imgAlt={name}
              onClick={() => this.goToGrade(id)}
              imgSrc={mimeType && photo ? `${mimeType},${photo}` : defaultImagesPaths.GRADE}
            >
              <CardLine>Disciplinas cadastradas: {subjects.length}</CardLine>
              <CardLine>Quantidade de professores: {qntTeachers}</CardLine>
              <CardLine>Quantidade de alunos: {qntStudents}</CardLine>
            </GridCard>
          ))}
          {userRole === 'ADMIN' && (
            <GridButton key="-1" Icon={AddCircleIcon} onClick={this.handleCreateGradeOpen} />
          )}
        </GridContainer>
      </Container>
    );
  }
}

GradesGrid.propTypes = {
  grades: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userRole: PropTypes.string.isRequired,
};

GradesGrid.defaultProps = {
  grades: [],
};

function mapStateToProps({ institution, grade, user }) {
  const { selectedInstitution } = institution;
  const { loggedUserId } = user;
  let userRole = 'NO_ROLE';
  if (
    selectedInstitution !== NO_INSTUTION_SELECTED &&
    institution.byId[selectedInstitution].grades
  ) {
    const { grades } = institution.byId[selectedInstitution];
    const isAdmin = institution.byId[selectedInstitution].admins.some(
      adminId => adminId === loggedUserId,
    );
    userRole = isAdmin ? 'ADMIN' : 'NO_ROLE';
    return {
      grades: grades.map(id => grade.byId[id]),
      userRole,
    };
  }

  return { userRole };
}

export default connect(mapStateToProps)(withRouter(GradesGrid));
