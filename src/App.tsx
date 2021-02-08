import React, { Component } from "react";
import "./lib/log";
import { Edit, Play, Code, Documentation } from "./views";
import { Context, store } from "./lib/context";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Header } from "./components/Header";
import { theme } from "./styles/theme";
import { game, executeCode } from "./data/game";
import { OptionsDrawer } from "./components/OptionsDrawer";
import { StyleDrawer } from "./components/StyleDrawer";
import { loadLocalSettings } from "./lib/localSettings";
import { loadGameData } from "./lib/loadGameData";
import { loadCustomComponents } from "./lib/loadCustomComponents";

loadLocalSettings();

export default class App extends Component {
  state = {
    ready: false,
  };

  async componentDidMount() {
    // This allows components to update the state
    // without being tied to the context
    store.update = this.update;

    // Load the game configuration
    loadGameData();

    await loadCustomComponents();

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
