import { store } from "./context";

export function saveLayout() {
  const { editorQuery } = store;

  if (!editorQuery) {
    console.error("store.editorQuery not set");
    return;
  }

  console.debug("Saving layout");

  localStorage.gameData = JSON.stringify({
    id: Math.random(),
    layout: editorQuery.serialize(),
  });
}
