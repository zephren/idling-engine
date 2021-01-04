import React, { Component } from "react";
import "./lib/log";
import { Edit, Play, Code } from "./views";
import { Context, store } from "./lib/context";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Header } from "./components/Header";
import { theme } from "./config/theme";
import { executeCode, setUpdateUIFunction } from "./lib/game";
import { OptionsDrawer } from "./components/OptionsDrawer";

export default class App extends Component {
  componentDidMount() {
    // This allows components to update the state
    // without being tied to the context
    store.update = this.update;

    setUpdateUIFunction(store.update);
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
              <Header />
              <Switch>
                <Route
                  path="/edit"
                  render={() => {
                    return <Edit />;
                  }}
                />
                <Route
                  path="/code"
                  render={() => {
                    return <Code />;
                  }}
                />
                <Route
                  path="/play"
                  render={() => {
                    return <Play />;
                  }}
                />
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
