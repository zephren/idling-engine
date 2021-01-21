const main = `

// You may wish to move each of the following to its own file

game.configure = (settings) => {
  // Update any game settings here
  // settings.tickInterval = 5000
}

game.initialize = () => {
  // Code executed when the application starts up
}

game.initializeGameData = () => {
  // Update any initial game data here
  game.data = new GameData()
}

game.tick = () => {
  // The main function to handle game logic
};

// Define actions using game.actions ...
// Define conditionals using game.conditionals ...
`;

const gameData = `

class GameData {
  constructor() {
    // Define game properties here
  }

  // Can use getters as well for use with variableText
}
`;

export const initialCode = {
  main,
  gameData,
};
