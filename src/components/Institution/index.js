import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InstitutionRoute from './InstitutionRoutes';

const InstitutionContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InstitutionPage = ({ match }) => (
  <InstitutionContainer>
    <InstitutionRoute match={match} />
  </InstitutionContainer>
);

InstitutionPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default InstitutionPage;
