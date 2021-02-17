import { executeCode, game } from "../data/game";
import { store } from "./context";
import { gameManager } from "./GameManager";
import { loadCustomComponents } from "./loadCustomComponents";
import { loadCustomComponentData, loadGameData } from "./loadGameData";

export async function initializeApp() {
  await gameManager.init();

  // const games = await gameManager.getAll();
  // console.log('All Gmaes', games)

  // Load custom components
  await loadCustomComponentData(localStorage.lastGameId);
  await loadCustomComponents();

  // Load the game configuration
  const { errors } = await loadGameData(localStorage.lastGameId);

  if (errors) {
    return { errors };
  }

  game.setUpdateUIFunction(store.update);
  executeCode();

  return {};
}
