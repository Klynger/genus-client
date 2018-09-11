import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { injectGlobal } from 'styled-components';
import Routes from './Routes';
import theme from '../utils/theme';

injectGlobal([`
  html, body {
    background-color: ${theme.palette.background.default};
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    height: 100%;
  }

  body {
    font-family: 'Robot', sans-serif;
    min-height: 100%;
  }

  #root {
    min-height: 100vh;
  }
`]);

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  );
};

export default App;
