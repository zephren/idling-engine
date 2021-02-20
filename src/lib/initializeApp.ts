import axios from "axios";
import { executeCode, game } from "../data/game";
import { store } from "./context";
import { gameManager } from "./GameManager";
import { loadCustomComponents } from "./loadCustomComponents";
import {
  loadCustomComponentData,
  loadCustomComponentDataById,
  loadGameConfig,
  loadGameConfigById,
} from "./loadGameConfig";
import { pluginRegistry } from "./PluginRegistry";

async function loadComponents() {
  // Load custom components
  await loadCustomComponents();

  console.groupCollapsed("Custom Components");
  console.log(Object.keys(pluginRegistry.components).join("\n"));
  console.log(pluginRegistry.components);
  console.groupEnd();
}

export async function initializeApp() {
  await gameManager.init();

  // const games = await gameManager.getAll();
  // console.log('All Gmaes', games)

  let errors;

  if (store.urlParams.gameConfig) {
    store.state.mode = "play";

    const gameConfigBase64 = (await axios.get(store.urlParams.gameConfig)).data;
    const gameConfigJson = atob(gameConfigBase64);
    const { gameConfig } = JSON.parse(gameConfigJson);

    loadCustomComponentData(gameConfig);
    loadComponents();

    errors = (await loadGameConfig(gameConfig)).errors;
  } else {
    await loadCustomComponentDataById(localStorage.lastGameId);
    loadComponents();

    // Load the game configuration
    errors = (await loadGameConfigById(localStorage.lastGameId)).errors;
  }

  if (errors) {
    return { errors };
  }

  game.setUpdateUIFunction(store.update);
  await executeCode();

  return {};
}
