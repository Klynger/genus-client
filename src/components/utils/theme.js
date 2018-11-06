import grey from '@material-ui/core/colors/grey';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      default: grey[200],
    },
    primary: { main: '#ff5722' },
    secondary: { main: '#ff9100' },
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
