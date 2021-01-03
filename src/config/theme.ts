import { createMuiTheme } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blueGrey[900],
    },
    secondary: {
      // This is green.A700 as hex.
      main: blueGrey[100],
    },
  },
});
