import React from "react";

export const store = {
  state: {
    localSettings: {
      highlightComponents: true,
      previousHighlightComponents: true,
      styleDrawerOpen: false,
      styleDrawerComponentName: "",
      styleDrawerStyleId: "",
      lastCodeFile: "",
    },
    optionsDrawerOpen: false,
  },
  editorQuery: null as any,
  update: () => {
    console.log("Update function not defined");
  },
};

export const Context = React.createContext(store);

(window as any).store = store;
