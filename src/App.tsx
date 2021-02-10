import React, { Component } from "react";
import "./lib/log";
import { Edit, Play, Code, Documentation } from "./views";
import { Context, store } from "./lib/context";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Button, CssBaseline, ThemeProvider } from "@material-ui/core";
import { Header } from "./components/Header";
import { theme } from "./styles/theme";
import { game, executeCode } from "./data/game";
import { OptionsDrawer } from "./components/OptionsDrawer";
import { StyleDrawer } from "./components/StyleDrawer";
import { loadLocalSettings } from "./lib/localSettings";
import { loadCustomComponentData, loadGameData } from "./lib/loadGameData";
import { loadCustomComponents } from "./lib/loadCustomComponents";
import { CustomComponentsDialog } from "./components/OptionsDrawer/CustomComponentsDialog";

loadLocalSettings();

export default class App extends Component {
  state = {
    ready: false,
    error: null,
    showCustomComponentsDialog: false,
  };

  async componentDidMount() {
    // This allows components to update the state
    // without being tied to the context
    store.update = this.update;

    // Load custom components
    loadCustomComponentData();
    await loadCustomComponents();

    try {
      // Load the game configuration
      loadGameData();
    } catch (error) {
      // console.error(error);
      this.setState({
        error,
      });
      return;
    }

    game.setUpdateUIFunction(store.update);
    executeCode();

    this.setState({
      ready: true,
    });
  }

  update = () => {
    // This causes the context provider to update
    this.setState({});
  };

  render() {
    if (this.state.error) {
      const { resolve } = this.state.error as any;

      return (
        <div>
          <div>
            There was an error loading your configured custom components
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
            <Button
              variant="contained"
              onClick={() => {
                resolve();
                window.location.reload();
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      );
    }

    if (!this.state.ready) {
      return null;
    }

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Context.Provider
          value={{
            state: store.state,
            update: this.update,
            editorQuery: store.editorQuery,
          }}
        >
          <BrowserRouter basename="/idling-engine">
            <div
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
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
      </ThemeProvider>
    );
  }
}
