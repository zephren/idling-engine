import React from "react";
import ReactDOM from "react-dom";

// Include pluin things first to load the registry and then internal plugins
import "./lib/PluginRegistry";
import "./plugins";
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

function checkIndexedDB() {
  return new Promise((resolve: any, reject: any) => {
    const errorMessage =
      "IndexedBD not available. Unsuppored in FF private browsing.";

    try {
      const db = indexedDB.open("isAvailable");
      db.onerror = function () {
        reject(errorMessage);
      };
      db.onsuccess = function () {
        resolve();
      };
    } catch (err) {
      reject(errorMessage);
    }
  });
}

(async () => {
  try {
    await checkIndexedDB();

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
  } catch (e) {
    ReactDOM.render(<div>{e}</div>, document.getElementById("root"));
  }
})();

// import reportWebVitals from "./reportWebVitals";
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
