import React, { Component } from "react";
import "./lib/log";
import { Edit, Play, Code, Documentation } from "./views";
import { Context, store } from "./lib/context";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Header } from "./components/Header";
import { OptionsDrawer } from "./components/OptionsDrawer";
import { StyleDrawer } from "./components/StyleDrawer";
import { loadLocalSettings } from "./lib/localSettings";
import { CustomComponentsDialog } from "./components/OptionsDrawer/CustomComponentsDialog";
import { initializeApp } from "./lib/initializeApp";
import { ProviderContext, withSnackbar } from "notistack";

loadLocalSettings();

interface Props extends ProviderContext {}

class App extends Component<Props> {
  state: {
    ready: boolean;
    errors: any[];
    showCustomComponentsDialog: boolean;
  } = {
    ready: false,
    errors: [],
    showCustomComponentsDialog: false,
  };

  async componentDidMount() {
    // This allows components to update the state
    // without being tied to the context
    store.update = this.update;
    store.enqueueSnackbar = this.props.enqueueSnackbar;

    const { errors } = await initializeApp();

    if (errors) {
      this.setState({ errors });
    } else {
      this.setState({ ready: true });
    }
  }

  update = () => {
    // This causes the context provider to update
    this.setState({});
  };

  render() {
    const { errors } = this.state;

    if (errors.length) {
      const { resolve } = errors as any;

      return (
        <div>
          <div>
            There was an error loading your configured custom components
            {errors.map((error) => {
              const { message, resolve } = error;
              return (
                <div key={error.message}>
                  "{message}"
                  <Button
                    variant="contained"
                    onClick={() => {
                      resolve();
                      // window.location.reload();
                    }}
                  >
                    Remove References
                  </Button>
                </div>
              );
            })}
          </div>
          <div>
            Option one is to fix URL of the missing component
            {this.state.showCustomComponentsDialog && (
              <CustomComponentsDialog
                onClose={() => {
                  this.setState({
                    showCustomComponentsDialog: false,
                  });
                }}
              />
            )}
            <Button
              variant="contained"
              onClick={() => {
                this.setState({
                  showCustomComponentsDialog: true,
                });
              }}
            >
              Manage Custom Components
            </Button>
          </div>
          <div>
            Option two is to remove all instances of the component that is
            causing the issue
          </div>
        </div>
      );
    }

    if (!this.state.ready) {
      return null;
    }

    return (
      <Context.Provider
        value={{
          state: store.state,
          editorQuery: store.editorQuery,
          enqueueSnackbar: store.enqueueSnackbar,
          update: this.update,
        }}
      >
        <BrowserRouter basename="/idling-engine">
          <div style={{ position: "absolute", width: "100%", height: "100%" }}>
            <OptionsDrawer />
            <StyleDrawer />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <Header />
              <div style={{ position: "relative", flexGrow: 1 }}>
                <Switch>
                  <Route path="/edit" render={() => <Edit />} />
                  <Route path="/code" render={() => <Code />} />
                  <Route path="/play" render={() => <Play />} />
                  <Route
                    path="/documentation"
                    render={() => <Documentation />}
                  />
                  <Route path="/">
                    <Redirect to="/edit" />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </Context.Provider>
    );
  }
}

export default withSnackbar(App);
