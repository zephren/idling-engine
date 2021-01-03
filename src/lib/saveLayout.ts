import { store } from "./context";

export function saveLayout() {
  const { editorQuery } = store;

  if (!editorQuery) {
    console.log("store.editorQuery not set");
    return;
  }

  console.log("Saving layout");

  localStorage.gameData = JSON.stringify({
    id: Math.random(),
    layout: editorQuery.serialize(),
  });
}
