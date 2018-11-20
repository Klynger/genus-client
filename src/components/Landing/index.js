import Signin from './Signin';
import Signup from './Signup';
import PropTypes from 'prop-types';
import theme from '../../utils/theme';
import styled from 'styled-components';
import React, { Component } from 'react';
import { Button, Snackbar } from '@material-ui/core';

const LandingContainer = styled.div`
  align-items: center;
  display: flex;
  height: calc(100vh - ${({ unit }) => unit * 2}px);
  justify-content: center;
  overflow: hidden;
  padding: ${({ unit }) => unit}px;
  position: relative;
  width: calc(100% - ${({ unit }) => unit * 2}px);
`;

const BackgroundImg = styled.img`
  filter: blur(3px);
  height: calc(100% + 10px);
  left: -5px;
  object-fit: cover;
  position: absolute;
  top: -5px;
  width: calc(100% + 10px);
`;

LandingContainer.propTypes = {
  unit: PropTypes.number,
};

LandingContainer.defaultProps = {
  unit: theme.spacing.unit,
};

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSnackbar: false,
      signinOpen: false,
      snackBarMsg: 'Usuário criado',
    };

    this.handleCloseSignin = this.handleCloseSignin.bind(this);
  }

  onSnackbarOpen = error => {
    const snackBarOptions = {
      snackBarMsg: '',
      openSnackbar: true,
    };
    if (!error) {
      snackBarOptions.snackBarMsg = 'Usuário criado!';
    } else {
      switch (error.message) {
        case '0':
          snackBarOptions.snackBarMsg = 'Houve algum problema na conexão.';
          break;
        default:
          snackBarOptions.snackBarMsg = 'Algo errado aconteceu.';
      }
    }
    this.setState(snackBarOptions);
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnackbar: false });
  };

  handleOpenSignin = () => {
    this.setState({ signinOpen: true });
  };

  handleCloseSignin = () => {
    this.setState({ signinOpen: false });
  };

  componentDidCatch(error) {
    this.onSnackbarOpen(error);
  }

  render() {
    const { signinOpen, openSnackbar, snackBarMsg } = this.state;

    return (
      <LandingContainer>
        <BackgroundImg src="/static/images/landing-background.jpg" />
        <Signup onSigninClick={this.handleOpenSignin} handleSnackbarOpen={this.onSnackbarOpen} />
        <Signin open={signinOpen} onClose={this.handleCloseSignin} />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            'aria-describedby': 'signup__message-id',
          }}
          message={<span id="signup__message-id">{snackBarMsg}</span>}
          action={
            <Button onClick={this.handleSnackbarClose} key="ok" color="primary" size="small">
              OK
            </Button>
          }
        />
      </LandingContainer>
    );
  }
}

export default Landing;
