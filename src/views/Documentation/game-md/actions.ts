export default function actions() {
  return `
## game.actions

\`Object\`

These are functions that handle actions you are allowing the user to perform.

Here is an example of a clicking activity for the player that adds one every time to a ~money~ property

~~~js
game.actions.mainClick = () => {
  game.data.money += 1;
};
~~~

Alternatively you could modify the amount gained based on the number of clicks.

~~~js
game.actions.mainClick = () => {
  game.data.money += Math.ceil(game.data.totalClicks / 100);
  game.data.totalClicks += 1;
};
~~~
`;
}
