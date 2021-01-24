import React, { Component } from "react";
import "./lib/log";
import { Edit, Play, Code, Documentation } from "./views";
import { Context, store } from "./lib/context";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Header } from "./components/Header";
import { theme } from "./config/theme";
import { executeCode, setUpdateUIFunction } from "./data/game";
import { OptionsDrawer } from "./components/OptionsDrawer";
import { StyleDrawer } from "./components/StyleDrawer";
import { loadLocalSettings } from "./lib/localSettings";
import { loadGameData } from "./lib/loadGameData";
import { data } from "./data/data";

loadLocalSettings();

export default class App extends Component {
  componentDidMount() {
    // This allows components to update the state
    // without being tied to the context
    store.update = this.update;

    setUpdateUIFunction(store.update);

    if (!data.gameData) {
      loadGameData();
    }

    executeCode();
  }

  update = () => {
    // This causes the context provider to update
    this.setState({});
  };

  render() {
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
            <div>
              <OptionsDrawer />
              <StyleDrawer />
              <Header />
              <Switch>
                <Route path="/edit" render={() => <Edit />} />
                <Route path="/code" render={() => <Code />} />
                <Route path="/play" render={() => <Play />} />
                <Route path="/documentation" render={() => <Documentation />} />
                <Route path="/">
                  <Redirect to="/edit" />
                </Route>
              </Switch>
            </div>
          </BrowserRouter>
        </Context.Provider>
      </ThemeProvider>
    );
  }
}
