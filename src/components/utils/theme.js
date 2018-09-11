import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    background: {
      default: grey[200],
    },
    primary: { main: '#1976D2' },
    secondary: { main: '#8BC34A' },
  },
});

export default theme;
