import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Snackbar } from '@material-ui/core';
import Signup from './Signup';
import Signin from './Signin';
import theme from '../utils/theme';

const LandingContainer = styled.div`
  align-items: center;
  display: flex;
  height: calc(100vh - ${({ unit }) => unit * 2}px);
  justify-content: center;
  padding: ${({ unit }) => unit}px;
  width: calc(100% - ${({ unit }) => unit * 2}px);
`;

LandingContainer.propTypes = {
  unit: PropTypes.number,
};

LandingContainer.defaultProps = {
  unit: theme.spacing.unit,
};

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSnackbar: false,
      signinOpen: false,
    };

    this.onSnackbarOpen = this.onSnackbarOpen.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.toggleSignin = this.toggleSignin.bind(this);
    this.handleCloseSignin = this.handleCloseSignin.bind(this);
  }

  onSnackbarOpen() {
    this.setState({ openSnackbar: true });
  }

  handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnackbar: false });
  }

  toggleSignin() {
    this.setState(prevState => ({ signinOpen: !prevState.signinOpen }));
  }

  handleCloseSignin() {
    this.setState({ signinOpen: false });
  }

  render() {
    const { signinOpen, openSnackbar } = this.state;

    return (
      <LandingContainer>
        <Signup
          handleSignin={this.toggleSignin}
          handleSnackbarOpen={this.onSnackbarOpen}
        />
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
          message={<span id="signup__message-id">User created</span>}
          action={
          <Button
            onClick={this.handleSnackbarClose}
            key="ok"
            color="primary"
            size="small"
          >OK
          </Button>}
        />
      </LandingContainer>
    );
  }
}

export default LandingPage;
