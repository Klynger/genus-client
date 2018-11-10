import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GridButton from '../../utils/GridButton';
import GradeCreateDialog from '../GradeCreateDialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GridCard, { CardLine } from '../../utils/GridCard';
import { NO_INSTUTION_SELECTED } from '../../../reducers/institution';
import { GridContainer, ResponsiveSubTitle } from '../../utils/SharedComponents';

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
    const { grades } = this.props;
    const { createGradeOpen } = this.state;
    return (
      <Container>
        <ResponsiveSubTitle>Séries</ResponsiveSubTitle>
        <GridContainer>
          <GradeCreateDialog open={createGradeOpen} onClose={this.handleCreateGradeClose} />
          {grades.map(({ id, name, subjects }) => (
            <GridCard key={id} title={name} onClick={() => this.goToGrade(id)}>
              <CardLine>Disciplinas cadastradas: {subjects.length}</CardLine>
              <CardLine>Quantidade de alunos: 35</CardLine>
            </GridCard>
          ))}
          <GridButton key="-1" Icon={AddCircleIcon} onClick={this.handleCreateGradeOpen} />
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
};

GradesGrid.defaultProps = {
  grades: [],
};

function mapStateToProps({ institution, grade }) {
  const { selectedInstitution } = institution;

  if (
    selectedInstitution !== NO_INSTUTION_SELECTED &&
    institution.byId[selectedInstitution].grades
  ) {
    const { grades } = institution.byId[selectedInstitution];
    return {
      grades: grades.map(id => grade.byId[id]),
    };
  }

  return {};
}

export default connect(mapStateToProps)(withRouter(GradesGrid));
