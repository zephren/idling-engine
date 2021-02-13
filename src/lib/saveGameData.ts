import { store } from "./context";
import { customStyles } from "../data/customStyles";
import { data } from "../data/data";
import { components } from "../data/components";
import { dataStorage } from "./dataStorage";

export function saveGameData() {
  const { editorQuery } = store;

  if (!editorQuery) {
    console.error("store.editorQuery not set");
    return;
  }

  console.debug("Saving game data");

  const baseStyles: any = {};

  for (const componentName in components) {
    // Kinda hacky but works
    const component = (components as any)[componentName];

    baseStyles[componentName] = component.baseStyle;
  }

  // Layout is a string
  let layout = editorQuery.serialize();

  // If this condition matches, then there was some error
  if (layout === "{}") {
    layout = null;
  }

  data.gameData = {
    id: Math.random(),
    layout,
    baseStyles,
    customStyles,
    customComponents: data.customComponents,
    codeFiles: data.gameData.codeFiles,
  };

  dataStorage.set("gameData", data.gameData);
}

/**
 * Get the gameData and only update the customComponents
 */
export function saveCustomComponents() {
  const gameData = dataStorage.get("gameData");

  gameData.customComponents = data.customComponents;

  dataStorage.set("gameData", gameData);
}
