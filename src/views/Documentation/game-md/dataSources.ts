export default function dataSources() {
  return `
## dataSources

\`Object\`

These are functions that return objects that represent the data to be rendered. The format of the returned data will depend on what is using it.

### Types

The following are the different formats for the standard components

#### For Tables

\`Array of objects\`

You have some flexibility in how you name the properties as the table component allows you to select the properties and how they are used, per colunmn

THe following example assumes there is an array of \`items\` that represents things the player can buy.

~~~js
game.dataSources.items = () => {
  return items.map((item) => {
    // Items and counts that the player has bought
    // They are stored in an object, keyed by the item name
    const count = game.data.item[item.name];

    return {
      name: item.name,
      cost: {
        data: () => {
          return \`\${item.cost(count)} (\${count})\`;
        }
      },
      action: {
        text: 'Buy',
        onClickAction: 'buyItem', // This is defined as part of game.actions
      },
    }
  })
};

~~~
`;
}
