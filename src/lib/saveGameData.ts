import { store } from "./context";
import { customStyles } from "../data/customStyles";
import { data } from "../data/data";
import { pluginRegistry } from "../lib/PluginRegistry";
import { dataStorage } from "./dataStorage";
import { gameManager } from "./GameManager";

export async function saveGameData() {
  const { editorQuery } = store;

  console.debug("Saving game data");

  let layout;

  if (editorQuery) {
    // Layout is a string
    layout = editorQuery.serialize();

    // If this condition matches, then there was some error
    if (layout === "{}") {
      layout = null;
    }
  } else {
    // This is ok, just need to use what's already there
    console.warn("store.editorQuery not set");

    layout = data.gameData.layout;
  }

  const baseStyles: any = {};

  for (const componentName in pluginRegistry.components) {
    // Kinda hacky but works
    const component = (pluginRegistry.components as any)[componentName];

    baseStyles[componentName] = component.baseStyle;
  }

  Object.assign(data.gameData, {
    layout,
    baseStyles,
    customStyles,
    customComponents: data.customComponents,
    codeFiles: data.gameData.codeFiles,
  });

  await gameManager.save(data.gameData);
}

/**
 * Get the gameData and only update the customComponents
 */
export async function saveCustomComponents() {
  gameManager.save(data.gameData);
}
