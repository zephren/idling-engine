const main = `

// You may wish to move each of the following to its own file

game.configure = (settings) => {
  // Update any game settings here
  // settings.tickInterval = 5000
}

game.initialize = (loadedGameData) => {
  // Code executed when the application starts up
  game.data = new GameData(loadedGameData);
}

game.initializeGameData = () => {
  // Code executed when the resetting the game data
  game.data = new GameData({});
  game.update();
}

game.tick = () => {
  // The main function to handle game logic
};

// Define actions using game.actions ...

game.actions.buttonClick = () => {
  game.data.counter++;
  game.update();
}
`;

const gameData = `

class GameData {
  constructor(data) {
    this._updateData(data);

    // Set the data
    for (const property in data) {
      this[property] = data[property];
    }
  }

  _updateData() {
    // Use this to update game data as changes are made
    if (!this.counter) {
      this.counter = 0;
    }
  }

  // Can use getters as well for use with variableText
}
`;

export const initialCode = {
  main,
  gameData,
};
