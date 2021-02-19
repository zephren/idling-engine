import { executeCode, game } from "../data/game";
import { store } from "./context";
import { gameManager } from "./GameManager";
import { loadCustomComponents } from "./loadCustomComponents";
import { loadCustomComponentData, loadGameConfig } from "./loadGameConfig";
import { pluginRegistry } from "./PluginRegistry";

export async function initializeApp() {
  await gameManager.init();

  // const games = await gameManager.getAll();
  // console.log('All Gmaes', games)

  // Load custom components
  await loadCustomComponentData(localStorage.lastGameId);
  await loadCustomComponents();

  console.groupCollapsed("Custom Components");
  console.log(Object.keys(pluginRegistry.components).join("\n"));
  console.log(pluginRegistry.components);
  console.groupEnd();

  // Load the game configuration
  const { errors } = await loadGameConfig(localStorage.lastGameId);

  if (errors) {
    return { errors };
  }

  game.setUpdateUIFunction(store.update);
  await executeCode();

  return {};
}
