import React from 'react';
import PropTypes from 'prop-types';
import GradeCard from './GradeCard';
import styled from 'styled-components';
import { connect } from 'react-redux';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 6px;

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

const GradesGrid = ({ gradeIds }) => {
  return (
    <GridContainer>
      {gradeIds.map(id => (
        <GradeCard key={id} gradeId={id} />
      ))}
    </GridContainer>
  );
};

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
