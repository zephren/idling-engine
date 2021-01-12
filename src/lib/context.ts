import React from "react";

const highlightComponents = true;

export const store = {
  state: {
    optionsDrawerOpen: false,
    styleDrawerOpen: false,
    highlightComponents,
    previoushighlightComponents: highlightComponents,
  },
  editorQuery: null as any,
  update: () => {
    console.log("Update function not defined");
  },
};

export const Context = React.createContext(store);

(window as any).store = store;
