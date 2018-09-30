import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateGradeButton from './CreateGradeButton';
import GradeCard from './GradeCard';
import styled from 'styled-components';
import { connect } from 'react-redux';
import GradeForm from '../GradeForm';
import { ResponsiveSubTitle } from '../../utils/SharedComponents';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-gap: 6px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));

  &:before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
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
