import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GradeCard from './GradeCard';
import GradeForm from '../GradeForm';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CreateGradeButton from './CreateGradeButton';
import {
  GridContainer, ResponsiveSubTitle,
} from '../../utils/SharedComponents';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

class GradesGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gradeOpen: false,
    };

    this.handleGradeOpen = this.handleGradeOpen.bind(this);
  }

  handleGradeOpen() {
    this.setState(prevState => ({ gradeOpen: !prevState.gradeOpen }));
  }

  render() {
    const { gradeIds } = this.props;
    const { gradeOpen } = this.state;
    return (
      <Wrapper>
        <ResponsiveSubTitle>Séries</ResponsiveSubTitle>
        <GridContainer>
          <GradeForm open={gradeOpen} onClose={this.handleGradeOpen} />
          {gradeIds.map(id => (
            <GradeCard key={id} gradeId={id} />
          ))}
          <CreateGradeButton onClick={this.handleGradeOpen} key="-1" />
        </GridContainer>
      </Wrapper>
    );
  }
}

GradesGrid.propTypes = {
  gradeIds: PropTypes.arrayOf(PropTypes.string),
};

GradesGrid.defaultProps = {
  gradeIds: [],
};

function mapStateToProps({ institution }) {
  const { selectedInstitution } = institution;
  return {
    gradeIds: institution.byId[selectedInstitution].grades,
  };
}

export default connect(mapStateToProps)(GradesGrid);
