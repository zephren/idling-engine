interface AnyObject {
  [key: string]: any;
}

export function setUpdateUIFunction(fn: any) {
  game.update = fn;
}

export const game = {
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

  // Configure
  configure: (settings: AnyObject) => {
    console.log("game.configure not defined");
  },

  // Initialize
  isInitialized: false,
  _initialize: (data: any) => {
    console.log("game.initialize not defined");
  },
  get initialize() {
    return this._initialize;
  },
  set initialize(fn) {
    this._initialize = () => {
      console.log("Initializing");
      this.isInitialized = true;
      fn(game.data);
    };
  },

  // Tick
  tick: () => {
    console.log("game.tick not defined");
  },

  // Update
  update: () => {
    console.log("game.update not defined");
  },
};

let currentTimeout: any = null;

// Tick
function tick() {
  currentTimeout = setTimeout(() => {
    game.tick();
    tick();
  }, game.settings.tickInterval);
}

export function executeCode() {
  const files: any = localStorage.gameCode
    ? JSON.parse(localStorage.gameCode)
    : [];

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

    if (!game.isInitialized) {
      game.initialize(game.data);
    }

    game.configure(game.settings);

    tick();
  } catch (err) {
    err.message = "GAME SCRIPT ERROR: " + err.message;
    console.error(err);
  }
}

(window as any).game = game;
