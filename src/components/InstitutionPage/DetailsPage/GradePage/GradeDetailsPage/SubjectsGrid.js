import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GridCard from '../../../../utils/GridCard';
import GridButton from '../../../../utils/GridButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SubjectCreateDialog from '../../../SubjectCreateDialog';
import { GridContainer, ResponsiveSubTitle } from '../../../../utils/SharedComponents';

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

  goToSubject = id => {
    const {
      push,
      location: { pathname },
    } = this.props.history;
    push(`${pathname}/subject/${id}`);
  };

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
            <GridCard key={id} title={name} onClick={() => this.goToSubject(id)} />
          ))}
          <GridButton key="-10" Icon={AddCircleIcon} onClick={this.handleSubjectDialogToggle} />
        </GridContainer>
      </Container>
    );
  }
}

SubjectsGrid.propTypes = {
  gradeId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
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

export default connect(mapToProps)(withRouter(SubjectsGrid));
