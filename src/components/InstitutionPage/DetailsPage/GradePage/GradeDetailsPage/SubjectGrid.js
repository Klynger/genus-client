import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SubjectCard from './SubjectCard';
import {
  GridContainer, ResponsiveSubTitle,
} from '../../../../utils/SharedComponents';
import GridButton from '../../../../utils/GridButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SubjectForm from '../../../SubjectForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 97%;
`;

class SubjectGrid extends Component {
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
    const { subjectIds } = this.props;
    const { subjectDialogOpen } = this.state;

    return (
      <Container>
        <ResponsiveSubTitle>Disciplinas</ResponsiveSubTitle>
        <SubjectForm
          open={subjectDialogOpen}
          onClose={this.handleSubjectDialogToggle}
        />
        <GridContainer>
          {subjectIds.map(id => (
            <SubjectCard key={id} subjectId={id} />
          ))}
          <GridButton
            key="-1"
            Icon={AddCircleIcon}
            onClick={this.handleSubjectDialogToggle}
          />
        </GridContainer>
      </Container>
    );
  }
}

SubjectGrid.propTypes = {
  gradeId: PropTypes.string.isRequired, // eslint-disable-line
  subjectIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function mapToProps({ grade: { byId } }, { gradeId }) {
    return {
      subjectIds: byId[gradeId] ? byId[gradeId].subjects : [],
    };
}

export default connect(mapToProps)(SubjectGrid);
