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
  state = {
    customComponentsLoaded: false,
  };

  async componentDidMount() {
    // This allows components to update the state
    // without being tied to the context
    store.update = this.update;

    setUpdateUIFunction(store.update);

    if (!data.gameData) {
      loadGameData();
    }

    executeCode();

    const loadingPromises = [];
    const errors: any = {};
    // http://localhost:9090/main.js
    for (const customComponent of data.customComponents) {
      if (!customComponent.url) {
        continue;
      }

      const p = new Promise((resolve: any) => {
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.src = customComponent.url;
        s.onload = () => {
          resolve();
        };
        s.onerror = (err) => {
          console.log(err);
          errors[customComponent.url] = err;
          resolve();
        };

        document.head.append(s);
      });

      loadingPromises.push(p);
    }

    await Promise.all(loadingPromises);

    console.log(errors);

    this.setState({
      customComponentsLoaded: true,
    });
  }

  update = () => {
    // This causes the context provider to update
    this.setState({});
  };

  render() {
    if (!this.state.customComponentsLoaded) {
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
