import Signin from './Signin';
import Signup from './Signup';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Snackbar, withStyles } from '@material-ui/core';

const styles = theme => ({
  landingContainer: {
    alignItems: 'center',
    display: 'flex',
    height: `calc(100vh - ${theme.spacing.unit * 2}px)`,
    justifyContent: 'center',
    overflow: 'hidden',
    padding: `${theme.spacing.unit}px`,
    position: 'relative',
    width: `calc(100% - ${theme.spacing.unit * 2}px)`,
  },
  backgroundImg: {
    filter: 'blur(3px)',
    height: 'calc(100% + 10px)',
    left: '-5px',
    objectFit: 'cover',
    position: 'absolute',
    top: '-5px',
    width: 'calc(100% + 10px)',
  },
});

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSnackbar: false,
      signinOpen: false,
      snackBarMsg: 'Usuário criado',
    };
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
          snackBarOptions.snackBarMsg =
            'Algo errado aconteceu. Tente novamente em alguns instantes.';
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
    const { classes } = this.props;

    return (
      <div className={classes.landingContainer}>
        <img
          className={classes.backgroundImg}
          alt="Landing_Background"
          src="/static/images/landing-background.jpg"
        />
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
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);
