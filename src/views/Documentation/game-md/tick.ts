export default function tick() {
  return `
## tick
\`Function\`

This is the function that is executed at the tick interval. This should be used to update any game data at the set \`game.settings.tickInterval\`.

~~~js
game.tick = () => {
  // Free money!
  game.data.money += 1;
}
~~~
`;
}
