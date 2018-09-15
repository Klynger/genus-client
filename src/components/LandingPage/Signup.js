import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Form } from 'formik';

const DEFAULT_ANIMATION_TIMING = 700;

const FadeInButton = styled(Button)`
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

const SignupContainer = styled.div`
  animation: translatedFadein ${DEFAULT_ANIMATION_TIMING}ms 1;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.4);
  padding: 12px;
  width: 30%;

  @keyframes translatedFadein {
    0% {
      animation-timing-function: ease-in-out;
      opacity: 0;
      transform: translateY(${props => props.totalTranslation}px);
    }

    50% {
      opacity: 0.8;
      transform: translateY(${props => props.totalTranslation * 0.2}px);
    }
    70% {
      opacity: 0.9;
      transform: translateY(${props => props.totalTranslation * 0.1}px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

SignupContainer.defaultProps = {
  totalTranslation: 100,
};

SignupContainer.propTypes = {
  totalTranslation: PropTypes.number,
};

class Signup extends Component {
  static propTypes = {
    handleSignin: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleDropImage.bind(this);
  }

  handleDropImage(files) {
    const { setFieldValue } = this.props;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsDataURLString = reader.result;
        const mimeType = fileAsDataURLString.substring(0, 22);
        const photoBase64 = fileAsDataURLString.substring(22 + 1);

        setFieldValue('mimeType', mimeType);
        setFieldValue('photo', photoBase64);
      };
      reader.readAsDataURL(file);
    });
  }

  render() {
    const { handleSignin } = this.props;

    return (
      <SignupContainer>
        <StyledForm>
          <FadeInButton
            color="secondary"
            delay={DEFAULT_ANIMATION_TIMING * 1.3}
            onClick={handleSignin}
          >
            Signin
          </FadeInButton>
        </StyledForm>
      </SignupContainer>
    );
  }
}

export default Signup;
