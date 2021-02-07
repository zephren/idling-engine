export default function visibilitySources() {
  return `
## visibilitySources

\`Object\`

These are functions that return a boolean value to indicate whether a component should be visible or not.

~~~js
game.visibilitySources.item1Feature = () => {
  // Returns true if the player has bought item1
  return !!game.data.items.item1;
}
~~~
`;
}
