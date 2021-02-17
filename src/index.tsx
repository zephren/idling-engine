import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import { theme } from "./styles/theme";
import App from "./App";
import "./styles/style.css";
import * as craftjs from "@craftjs/core";
import * as core from "./core";
import { Button, CssBaseline, ThemeProvider } from "@material-ui/core";

(window as any)["idlingEngineCore"] = core;
(window as any)["craftjs"] = craftjs;

const notistackRef: any = React.createRef();
const onClickDismiss = (key: any) => () => {
  notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider
      maxSnack={5}
      ref={notistackRef}
      autoHideDuration={null}
      action={(key) => (
        <Button onClick={onClickDismiss(key)} color="secondary">
          Dismiss
        </Button>
      )}
    >
      <App />
    </SnackbarProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// import reportWebVitals from "./reportWebVitals";
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
