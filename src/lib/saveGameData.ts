import { store } from "./context";
import { customStyles } from "../data/customStyles";
import { data } from "../data/data";
import { components } from "../components/CustomComponents/components";

export function saveGameData() {
  const { editorQuery } = store;

  if (!editorQuery) {
    console.error("store.editorQuery not set");
    return;
  }

  console.debug("Saving game data");

  const baseStyles: any = {};

  for (const componentName in components) {
    // Kinda hacky but works
    const component = (components as any)[componentName];

    baseStyles[componentName] = component.baseStyle;
  }

  data.gameData = {
    id: Math.random(),
    layout: editorQuery.serialize(),
    baseStyles,
    customStyles,
  };

  localStorage.gameData = JSON.stringify(data.gameData);
}
