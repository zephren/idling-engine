import { store } from "./context";
import { customStyles } from "../data/customStyles";
import { data } from "../data/data";
import { pluginRegistry } from "../lib/PluginRegistry";
import { dataStorage } from "./dataStorage";
import { gameManager } from "./GameManager";
import { v4 as uuid } from "uuid";

export function saveGameData() {
  const { editorQuery } = store;

  if (!editorQuery) {
    console.error("store.editorQuery not set");
    return;
  }

  console.debug("Saving game data");

  const baseStyles: any = {};

  for (const componentName in pluginRegistry.components) {
    // Kinda hacky but works
    const component = (pluginRegistry.components as any)[componentName];

    baseStyles[componentName] = component.baseStyle;
  }

  // Layout is a string
  let layout = editorQuery.serialize();

  // If this condition matches, then there was some error
  if (layout === "{}") {
    layout = null;
  }

  data.gameData = {
    id: data.gameData.id || uuid(),
    layout,
    baseStyles,
    customStyles,
    customComponents: data.customComponents,
    codeFiles: data.gameData.codeFiles,
  };

  dataStorage.set("gameData", data.gameData);
  localStorage.lastGameId = data.gameData.id;

  gameManager.save(data.gameData);
}

/**
 * Get the gameData and only update the customComponents
 */
export async function saveCustomComponents() {
  gameManager.save(data.gameData);
}
