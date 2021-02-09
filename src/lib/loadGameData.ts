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

export function validateLayout(layoutData: any) {
  const layout = JSON.parse(layoutData);
  console.log(layout, Object.keys(layout));

  for (const id of Object.keys(layout)) {
    if (id === "ROOT") {
      continue;
    }

    console.log(id);

    const {
      type: { resolvedName },
    } = layout[id];

    if (!components[resolvedName]) {
      throw new Error(`Unknown component ${resolvedName}`);
    }
  }
}

export function loadGameData() {
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

    validateLayout(data.gameData.layout);

    console.log("Game data loaded");

    return;
  } else {
    console.warn("Starting new game data");

    data.gameData = initialGameData;
    return;
  }
}
