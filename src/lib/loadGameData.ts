import { customStyles } from "../data/customStyles";
import { data } from "../data/data";
import { pluginRegistry } from "../lib/PluginRegistry";
import { initialCode } from "../data/initial/code";
import { addCodeFile } from "../data/game";
import { gameManager } from "./GameManager";
import { v4 as uuid } from "uuid";
import { saveGameData } from "./saveGameData";

function setupNewGameData() {
  localStorage.lastGameId = uuid();

  data.gameData = {
    id: localStorage.lastGameId,
    name: "New Game",
    codeFiles: [],
  };

  addCodeFile("main", "//main\n" + initialCode.main);
  addCodeFile("gameData", "//gameData\n" + initialCode.gameData);
}

function loadComponentProperties(baseStyles: any) {
  for (const componentName in baseStyles) {
    const component = pluginRegistry.components[componentName];
    const baseStyle = baseStyles[componentName];

    if (component && baseStyle) {
      component.baseStyle = {
        ...component.baseStyle,
        ...baseStyle,
      };
    }
  }
}

async function cleanMissingComponents(componentName: string) {
  const gameData = await gameManager.load(localStorage.lastGameId);

  const layout = JSON.parse(gameData.layout);
  const newLayout: any = {};

  for (const id of Object.keys(layout)) {
    if (layout[id].type.resolvedName !== componentName) {
      // Ok to keep this component
      newLayout[id] = layout[id];
    } else {
      // Remove the reference to the node by its id
      for (const otherComponent of Object.values(layout) as any[]) {
        const index = otherComponent.nodes.indexOf(id);

        if (index >= 0) {
          otherComponent.nodes.splice(index, 1);
        }
      }
    }
  }

  gameData.layout = JSON.stringify(newLayout);

  await gameManager.save(gameData);
}

export function validateLayout(layoutData: any) {
  const layout = JSON.parse(layoutData);
  const errors = [];

  for (const id of Object.keys(layout)) {
    if (id === "ROOT") {
      continue;
    }

    const {
      type: { resolvedName },
    } = layout[id];

    if (!pluginRegistry.components[resolvedName]) {
      const error = {
        message: `Unknown component ${resolvedName}`,
        resolve: () => {
          cleanMissingComponents(resolvedName);
        },
      };

      errors.push(error);
    }
  }

  return errors;
}

// This needs to be able to run before loading the game data,
// so that any custom components can be loaded first
export async function loadCustomComponentData(gameId: string) {
  let storedGameData = await gameManager.load(gameId);

  if (storedGameData) {
    data.customComponents = storedGameData.customComponents || [];

    return;
  }

  data.customComponents = [];
}

export async function loadGameData(gameId: string) {
  let storedGameData = await gameManager.load(gameId);

  if (storedGameData) {
    if (storedGameData.baseStyles) {
      loadComponentProperties(storedGameData.baseStyles);
    }

    if (storedGameData.customStyles) {
      Object.assign(customStyles, storedGameData.customStyles);
    }

    data.gameData = storedGameData;

    const errors = validateLayout(data.gameData.layout);

    if (errors.length) {
      return { errors };
    }

    console.debug("Game data loaded");

    return {};
  } else {
    console.warn("Starting new game data");

    setupNewGameData();

    await saveGameData();

    return {};
  }
}
