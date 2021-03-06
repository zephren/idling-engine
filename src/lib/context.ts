import React from "react";

export interface LocalSettingsFlags {
  highlightComponents: boolean; // Highlight components and apply padding for easier selection
  previousHighlightComponents: boolean; // The last state of the setting (used when opening the style editor)
  styleDrawerOpen: boolean;
  tickWhileEditing: boolean; // Whether or not to run game logic while editing the layout
}

export interface LocalSettings {
  flags: LocalSettingsFlags;
  lastCodeFile: string; // The last file that was being edited in the code editor
  styleDrawerComponentName: string;
  styleDrawerStyleId: string;
}

const urlSearchParams = new URLSearchParams(window.location.search);
const urlParams = {
  gameConfig: urlSearchParams.get("gameConfig"),
};

export const store = {
  state: {
    localSettings: {
      flags: {
        highlightComponents: true,
        previousHighlightComponents: true,
        styleDrawerOpen: false,
        tickWhileEditing: false,
      },
      lastCodeFile: "",
      styleDrawerComponentName: "",
      styleDrawerStyleId: "",
    } as LocalSettings,
    optionsDrawerOpen: false,
    mode: "",
  },
  urlParams,
  editorQuery: null as any, // The object to be able to query the editor
  enqueueSnackbar: (() => {}) as any,
  update: (): void => {
    throw new Error("Update function not defined");
  },
};

export const Context = React.createContext(store);

(window as any).store = store;
