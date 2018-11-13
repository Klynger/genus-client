import React from 'react';
import Routes from './Routes';
import theme from '../../utils/theme';
import { createGlobalStyle } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';

const GlobalStyles = createGlobalStyle`
  html, body {
    background-color: ${theme.palette.background.default};
    box-sizing: border-box;
    display: block !important;
    margin: 0;
    min-width: 100% !important;
    padding: 0;
  }

  html {
    height: 100%;
  }

  body {
    font-family: 'Robot', sans-serif;
    min-height: 100%;
  }
`;

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Routes />
      <GlobalStyles />
    </MuiThemeProvider>
  );
};

export default App;
