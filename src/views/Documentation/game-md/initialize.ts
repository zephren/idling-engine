export default function initialize() {
  return `
## initialize

\`Function\`

This is code executed when the game starts up. Saved player game data is passed in as a parameter so that it can be processed to resume the last game state.

This examples is creating an instance of a class \`GameData\` and using the loadedGameData. The instance is set to the \`game.data\` property.

~~~js
game.initialize = (loadedGameData) => {
  game.data = new GameData(loadedGameData);
}
~~~
`;
}
