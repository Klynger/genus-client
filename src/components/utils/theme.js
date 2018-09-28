import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    background: {
      default: grey[200],
    },
    primary: { main: '#ff5722' },
    secondary: { main: '#ff9100' },
  },
});

export default theme;
