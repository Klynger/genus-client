import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GridCard from '../../../../utils/GridCard';
import {
  GridContainer, ResponsiveSubTitle,
} from '../../../../utils/SharedComponents';
import GridButton from '../../../../utils/GridButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SubjectCreateDialog from '../../../SubjectCreateDialog';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 97%;
`;

class SubjectsGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjectDialogOpen: false,
    };
    this.handleSubjectDialogToggle = this.handleSubjectDialogToggle.bind(this);
  }

  handleSubjectDialogToggle() {
    this.setState(({ subjectDialogOpen }) => ({
      subjectDialogOpen: !subjectDialogOpen,
    }));
  }

  render() {
    const { gradeId, subjects } = this.props;
    const { subjectDialogOpen } = this.state;

    return (
      <Container>
        <ResponsiveSubTitle>Disciplinas</ResponsiveSubTitle>
        <SubjectCreateDialog
          gradeId={gradeId}
          open={subjectDialogOpen}
          onClose={this.handleSubjectDialogToggle}
        />
        <GridContainer>
          {subjects.map(({ id, name }) => (
            <GridCard key={id} title={name} />
          ))}
          <GridButton
            key="-10"
            Icon={AddCircleIcon}
            onClick={this.handleSubjectDialogToggle}
          />
        </GridContainer>
      </Container>
    );
  }
}

SubjectsGrid.propTypes = {
  gradeId: PropTypes.string.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.object),
};

SubjectsGrid.subjects = {
  subjects: [],
};

function mapToProps({ grade, subject }, { gradeId }) {
  if (grade.byId[gradeId] && grade.byId[gradeId].subjects) {
    return {
      subjects: grade.byId[gradeId].subjects.map(id => subject.byId[id]),
    };
  }

  return {};
}

export default connect(mapToProps)(SubjectsGrid);
