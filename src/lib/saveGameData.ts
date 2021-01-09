import { store } from "./context";
import { componentProperties } from "../data/componentProperties";

export function saveGameData() {
  const { editorQuery } = store;

  if (!editorQuery) {
    console.error("store.editorQuery not set");
    return;
  }

  console.debug("Saving game data");

  localStorage.gameData = JSON.stringify({
    id: Math.random(),
    layout: editorQuery.serialize(),
    componentProperties,
  });
}
