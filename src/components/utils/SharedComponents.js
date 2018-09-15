import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

export const FadeInButton = styled(Button)`
  animation: fadeIn ${({ delay }) => delay * 2}ms;
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

FadeInButton.defaultProps = {
  delay: 700,
};

FadeInButton.propTypes = {
  delay: PropTypes.number,
};

export default {};
