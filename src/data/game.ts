import { store } from "../lib/context";
import { dataStorage } from "../lib/dataStorage";
import { data } from "./data";
import { v4 as uuid } from "uuid";
import { logEvents } from "../lib/log";

interface AnyObject {
  [key: string]: any;
}

export const game = {
  running: false,

  // Settings
  settings: {
    tickInterval: 1000,
  },

  // Data
  data: {} as AnyObject,

  // Actions
  actions: {} as AnyObject,

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

  /**
   * Update the UI
   * Set by the system
   */
  update: () => {
    console.log("game.update not defined");
  },

  setUpdateUIFunction: (fn: any) => {
    game.update = fn;
  },
};

let currentTimeout: any = null;

// Tick
// Slightly more complex than setTimeout
// But more performant
let runningInterval: any = null;
let ticking = false;
function startTicking() {
  if (runningInterval) {
    clearInterval(runningInterval);
  }

  runningInterval = setInterval(async () => {
    try {
      if (!ticking) {
        ticking = true;
        await game.tick();
      }
    } catch (err) {
      console.error(err);
    }

    // Always set to false once done
    ticking = false;
  }, game.settings.tickInterval);
}

export function addCodeFile(name: string, code: string) {
  data.gameData.codeFiles.push({
    id: uuid(),
    name,
    code,
  });
}

let fileLineCounts: number[] = [];

export function executeCode() {
  const files: any = data.gameData.codeFiles;
  fileLineCounts = [];

  let finalCode = "";
  for (const file of files) {
    finalCode += file.code + "\n";
    fileLineCounts.push(file.code.split("\n").length);
  }

  const lines = finalCode.split("\n");
  const numberWidth = Math.floor(Math.log(lines.length));

  console.groupCollapsed("GAME CODE");
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
  console.groupEnd();

  try {
    // eslint-disable-next-line no-eval
    eval(finalCode);

    let loadedGameData = dataStorage.get("savedGameData", {});

    console.log("loadedGameData", loadedGameData);

    if (!game.isInitialized) {
      game.initialize(loadedGameData);
    }

    game.configure(game.settings);

    startTicking();
  } catch (err) {
    err.message = "GAME SCRIPT ERROR: " + err.message;
    console.error(err);
  }
}

/**
 * Save game data on an interval
 */
setInterval(() => {
  dataStorage.set("savedGameData", game.data);
}, 5000);

function handleError(args: any[]) {
  if (args[0]?.message && args[0]?.stack) {
    const { message, stack } = args[0];
    let snackbarMessage = message;
    let lineNumber = null;

    const stackLines = stack.split("\n");

    // This loop coveres Chrome and FF
    for (let i = 0; i < 2; i++) {
      const line = stackLines[i];
      if (line.includes("eval")) {
        const matches = line.match(/(\d+):(\d+)/g);

        if (matches.length) {
          const match = matches[matches.length - 1].split(":");
          lineNumber = [parseInt(match[0]), parseInt(match[1])];
          break;
        }
      }
    }

    if (lineNumber) {
      let lineTotal = 0;
      for (const index in fileLineCounts) {
        const fileLineCount = fileLineCounts[index];

        if (lineNumber[0] < lineTotal + fileLineCount) {
          const actualLine = lineNumber[0] - lineTotal;
          const col = lineNumber[1];
          const { name } = data.gameData.codeFiles[index];

          snackbarMessage += ` (Line: ${actualLine}, Col: ${col}) in "${name}"`;
          break;
        }

        lineTotal += fileLineCount;
      }
    }

    store.enqueueSnackbar(snackbarMessage, {
      variant: "error",
      preventDuplicate: true,
    });
  }
}

// Handle script errors
logEvents.on("error", handleError);

(window as any).game = game;
