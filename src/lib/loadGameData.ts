import { customStyles } from "../data/customStyles";
import { data } from "../data/data";
import { components } from "../data/components";
import { dataStorage } from "./dataStorage";

const initialGameData = {
  codeFiles: [],
};

function loadComponentProperties(baseStyles: any) {
  for (const componentName in baseStyles) {
    const component = components[componentName];
    const baseStyle = baseStyles[componentName];

    if (component && baseStyle) {
      component.baseStyle = {
        ...component.baseStyle,
        ...baseStyle,
      };
    }
  }
}

export function loadGameData() {
  try {
    let storedGameData = dataStorage.get("gameData");

    if (storedGameData) {
      if (storedGameData.baseStyles) {
        loadComponentProperties(storedGameData.baseStyles);
      }

      if (storedGameData.customStyles) {
        Object.assign(customStyles, storedGameData.customStyles);
      }

      data.gameData = storedGameData;
      data.customComponents = storedGameData.customComponents || [];
      console.log("Game data loaded");
      return storedGameData;
    }

    console.warn("No game data loaded");
  } catch (err) {
    console.error(err);
  }

  data.gameData = initialGameData;

  return null;
}
