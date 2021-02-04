import { createMuiTheme } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";

const colors = {
  primary: blueGrey[900],
  secondary: blueGrey[100],
};

export const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: colors.primary,
    },
    secondary: {
      // This is green.A700 as hex.
      main: colors.secondary,
    },
  },
  overrides: {
    MuiSwitch: {
      switchBase: {
        // Controls default (unchecked) color for the thumb
        color: colors.secondary,
      },
      colorSecondary: {
        "&$checked": {
          // Controls checked color for the thumb
          color: colors.primary,
        },
      },
      track: {
        // Controls default (unchecked) color for the track
        opacity: 0.2,
        backgroundColor: colors.primary,
        "$checked$checked + &": {
          // Controls checked color for the track
          opacity: 0.5,
          backgroundColor: colors.primary,
        },
      },
    },
  },
});
