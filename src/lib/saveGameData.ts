import { store } from "./context";
import { componentProperties } from "../data/componentProperties";
import { data } from "../data/data";

export function saveGameData() {
  const { editorQuery } = store;

  if (!editorQuery) {
    console.error("store.editorQuery not set");
    return;
  }

  console.debug("Saving game data");

  data.gameData = {
    id: Math.random(),
    layout: editorQuery.serialize(),
    componentProperties,
  };

  localStorage.gameData = JSON.stringify(data.gameData);
}
