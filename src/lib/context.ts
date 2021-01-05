import React from "react";

export const store = {
  state: {
    drawerOpen: false,
    highlightComponents: false,
  },
  editorQuery: null as any,
  update: () => {
    console.log("Update function not defined");
  },
};

export const Context = React.createContext(store);

(window as any).store = store;
