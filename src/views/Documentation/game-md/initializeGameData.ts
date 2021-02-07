export default function initializeGameData() {
  return `
## initializeGameData

\`Function\`

This is code executed when a new game is started. It can also be called manually to reset the game.

~~~js
game.initializeGameData = () => {
  game.data = new GameData({});
  game.update();
}
~~~
`;
}
