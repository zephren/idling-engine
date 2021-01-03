//main

// You may wish to move each of the following to its own file

const configuration = {};
configuration.buildings = {
  building1: {
    name: "Building 1",
    costFn: (currentAmount) => {
      return currentAmount * 10;
    },
    moneyFn: (amount) => {
      return amount * 2;
    },
  },
  building2: {
    name: "Building 2",
    costFn: (currentAmount) => {
      return currentAmount * 100;
    },
    moneyFn: (amount) => {
      return amount * 20;
    },
  },
  building3: {
    name: "Building 3",
    costFn: (currentAmount) => {
      return currentAmount * 1000;
    },
    moneyFn: (amount) => {
      return amount * 200;
    },
  },
};

game.configure = (settings) => {
  // Update any game settings here
  // settings.tickInterval = 5000
};

game.initialize = () => {
  // Update any initial game data here
  game.data.money = 0;
  game.data.buildings = {};
};

game.tick = () => {
  // The main function to handle game logic
  game.data.money += 10;

  for (const buildingId in game.data.buildings) {
    const count = game.data.buildings[buildingId];
    const building = configuration.buildings[buildingId];
    game.data.money += building.moneyFn(count);
  }

  game.update();
};

// Define actions using game.actions ...
// Define conditionals using game.conditionals ...

game.actions.initialize = () => {
  game.initialize();
};

game.actions.buyThing = (thing) => {
  const { buildingId } = thing;
  const building = configuration.buildings[buildingId];

  if (!game.data.buildings[buildingId]) {
    game.data.buildings[buildingId] = 0;
  }

  const count = game.data.buildings[buildingId];
  const cost = building.costFn(count);

  if (cost > game.data.money) {
    alert("Cannot afford!");
    return;
  }

  game.data.buildings[buildingId] += 1;
  game.data.money -= cost;
  game.update();
};

game.dataSources.tableData = () => {
  const rows = [];

  for (const buildingId in configuration.buildings) {
    const building = configuration.buildings[buildingId];
    const count = game.data.buildings[buildingId] || 0;

    rows.push({
      buildingId,
      col1: building.name,
      col2: {
        data: (item) => {
          return `${count} (${building.costFn(count)})`;
        },
      },
      col3: {
        text: "Buy",
        onClickAction: "buyThing",
      },
    });
  }

  return rows;
};
