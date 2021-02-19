import { store } from "./context";
import { customStyles } from "../data/customStyles";
import { data } from "../data/data";
import { pluginRegistry } from "./PluginRegistry";
import { gameManager } from "./GameManager";

export async function saveGameConfig() {
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
    // This is ok for the editorQuery to not be available, just need to use what's already there
    // Just means that the editor was never opened to change anything
    layout = data.gameConfig.layout;
  }

  const baseStyles: any = {};

  for (const componentName in pluginRegistry.components) {
    // Kinda hacky but works
    const component = (pluginRegistry.components as any)[componentName];

    baseStyles[componentName] = component.baseStyle;
  }

  Object.assign(data.gameConfig, {
    layout,
    baseStyles,
    customStyles,
    customComponents: data.customComponents,
    codeFiles: data.gameConfig.codeFiles,
  });

  await gameManager.save(data.gameConfig);
}

/**
 * Get the gameData and only update the customComponents
 */
export async function saveCustomComponents() {
  gameManager.save(data.gameConfig);
}
