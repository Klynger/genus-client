import React from 'react';
import styled from 'styled-components';

const LandingContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
  width: 100%;
`;

const TestingPage = () => {
  return (
    <LandingContainer>
      TestingPage works
    </LandingContainer>
  );
};

export default TestingPage;
