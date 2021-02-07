export default function configure() {
  return `
## game.configure

\`Function\`

Use this function to set global properties that configure how the game will run.

~~~js
game.configure = (settings) => {
  ...
}
~~~

### settings.tickInterval

How frequently the \`game.tick\` function should be called.

~~~js
settings.tickInterval = 3000;
~~~
`;
}
