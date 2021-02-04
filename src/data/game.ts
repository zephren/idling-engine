import { store } from "../lib/context";
import { dataStorage } from "../lib/dataStorage";
import { data } from "./data";

interface AnyObject {
  [key: string]: any;
}

export const game = {
  running: true,

  // Settings
  settings: {
    tickInterval: 1000,
  },

  // Data
  data: {} as AnyObject,

  // Actions
  actions: {} as AnyObject,

  // Conditionals
  conditionals: {} as AnyObject,

  // Data sources
  dataSources: {} as AnyObject,

  // Visibility sources
  visibilitySources: {} as AnyObject,

  // Configure
  configure: (settings: AnyObject) => {
    console.log("game.configure not defined");
  },

  // Initialized state
  isInitialized: false,
  isGameDataInitialized: false,

  // initialize
  _initialize: (loadedGameData: any) => {
    console.log("game.initialize not defined");
  },

  get initialize() {
    return this._initialize;
  },

  set initialize(fn) {
    this._initialize = (loadedGameData: any) => {
      console.log("Initializing Game");
      this.isInitialized = true;
      fn(loadedGameData);
    };
  },

  // initializeGameData
  _initializeGameData: () => {
    console.log("game.initializeGameData not defined");
  },

  get initializeGameData() {
    return this._initializeGameData;
  },

  set initializeGameData(fn) {
    this._initializeGameData = () => {
      console.log("Initializing Game Data");
      this.isInitialized = true;
      fn();
    };
  },

  // tick
  _tick: () => {
    console.log("game.tick not defined");
  },

  get tick() {
    return this._tick;
  },

  set tick(fn) {
    this._tick = () => {
      if (game.running || store.state.localSettings.flags.tickWhileEditing) {
        fn();
      }
    };
  },

  // update
  update: () => {
    console.log("game.update not defined");
  },

  setUpdateUIFunction: (fn: any) => {
    game.update = fn;
  },
};

let currentTimeout: any = null;

// Tick
function tick() {
  currentTimeout = setTimeout(() => {
    try {
      game.tick();
    } catch (err) {
      console.error(err);
    }
    tick();
  }, game.settings.tickInterval);
}

export function executeCode() {
  const files: any = data.gameData.codeFiles;

  let finalCode = "";
  for (const file of files) {
    finalCode += file.code + "\n\n";
  }

  const lines = finalCode.split("\n");
  const numberWidth = Math.floor(Math.log(lines.length));

  console.log(
    lines
      .map((line, index) => {
        const numberedLine = `${(index + 1)
          .toString()
          .padEnd(numberWidth)} ${line}`;
        return numberedLine;
      })
      .join("\n")
  );

  try {
    // Stop anything currently executing
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }

    // eslint-disable-next-line no-eval
    eval(finalCode);

    let loadedGameData = dataStorage.get("savedGameData", {});

    console.log("loadedGameData", loadedGameData);

    if (!game.isInitialized) {
      game.initialize(loadedGameData);
    }

    game.configure(game.settings);

    tick();
  } catch (err) {
    err.message = "GAME SCRIPT ERROR: " + err.message;
    console.error(err);
  }
}

setInterval(() => {
  dataStorage.set("savedGameData", game.data);
}, 5000);

(window as any).game = game;
