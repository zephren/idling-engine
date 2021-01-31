import { customStyles } from "../data/customStyles";
import { data } from "../data/data";
import { components } from "../data/components";

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
    let storedGameData = localStorage.gameData;

    if (storedGameData) {
      storedGameData = JSON.parse(storedGameData);

      if (storedGameData.baseStyles) {
        loadComponentProperties(storedGameData.baseStyles);
      }

      if (storedGameData.customStyles) {
        Object.assign(customStyles, storedGameData.customStyles);
      }

      data.gameData = storedGameData;
      data.customComponents = storedGameData.customComponents || [];

      return storedGameData;
    }

    console.warn("No game data loaded");
  } catch (err) {
    console.error(err);
  }

  data.gameData = {};

  return null;
}
