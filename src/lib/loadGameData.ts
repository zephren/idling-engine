export function loadGameData() {
  try {
    let { gameData } = localStorage;

    if (gameData) {
      gameData = JSON.parse(gameData);
    }

    return gameData || null;
  } catch (err) {
    return null;
  }
}
