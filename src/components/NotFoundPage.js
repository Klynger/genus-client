import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DivContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  min-height: 145px;
  width: 100%;
`;

const NotFoundBreakpoints = styled.span`
  @media screen and (min-width: 1300px) {
    font-size: ${props => props.maxSize}em;
  }
  @media screen and (min-width: 1000px) and (max-width: 1299px) {
    font-size: ${props => props.maxSize * 0.7}em;
  }
  @media screen and (min-width: 700px) and (max-width: 999px) {
    font-size: ${props => props.maxSize * 0.5}em;
  }
  @media screen and (min-width: 400px) and (max-width: 699px) {
    font-size: ${props => props.maxSize * 0.4}em;
  }
  @media screen and (max-width: 399px) {
    font-size: ${props => props.maxSize * 0.3}em;
  }
`;

NotFoundBreakpoints.propTypes = {
  maxSize: PropTypes.number,
};

NotFoundBreakpoints.defaultProps = {
  maxSize: 6,
};

const NotFoundText = NotFoundBreakpoints.extend`
  color: #ccc;
  font-weight: 500;
`;

const NotFound404 = NotFoundBreakpoints.extend`
  color: #ccc;
  font-weight: 500;
`;

const NotFoundPage = () => (
  <DivContainer>
    <NotFound404 maxSize={12}>
      404
    </NotFound404>
    <NotFoundText>
      Page Not Found
    </NotFoundText>
  </DivContainer>
);

export default NotFoundPage;
