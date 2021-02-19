import { openDB } from "idb";

const version = 10;

class GameManager {
  db: any;
  setReady: any;
  ready = new Promise<boolean>((resolve) => {
    this.setReady = resolve;
  });

  async init() {
    const db = await openDB("GameConfig", version, {
      upgrade: this._upgrade,
      blocked: this._blocked,
      blocking: this._blocking,
      terminated: this._terminated,
    });

    db.onerror = function (event: any) {
      console.error("Database error: " + event.target.errorCode);
    };

    // db.onsuccess = function(event) {
    //   // Do something with request.result!
    // };

    this.db = db;

    this.setReady();

    console.debug("DATABASE", db);
  }

  _upgrade(db: any, oldVersion: any, newVersion: any, transaction: any) {
    console.debug("UPGRADE DATABASE", version);

    if (!db.objectStoreNames.contains("games")) {
      db.createObjectStore("games", { keyPath: "id" });
    }

    if (!db.objectStoreNames.contains("gameData")) {
      db.createObjectStore("gameData", {
        keyPath: "id",
      });
    }
  }

  _blocked() {}

  _blocking() {}

  _terminated() {}

  /**
   * GAME CONFIG
   */
  async getAll() {
    await this.ready;

    // console.log("GETTING ALL GAMES");

    const transaction = this.db.transaction(["games"], "readwrite");
    const gamesStore = transaction.objectStore("games");
    const games = await gamesStore.getAll();

    await transaction.done;

    return games;
  }

  async save(gameConfig: any) {
    await this.ready;

    // console.log("INDEX DB SAVE", gameConfig.id, gameConfig);

    const transaction = this.db.transaction(["games"], "readwrite");
    const gamesStore = transaction.objectStore("games");
    await gamesStore.put(gameConfig);

    await transaction.done;
  }

  async load(gameId: string) {
    if (!gameId) {
      return;
    }

    await this.ready;

    const transaction = this.db.transaction(["games"], "readwrite");
    const gamesStore = transaction.objectStore("games");
    const game = await gamesStore.get(gameId);

    await transaction.done;

    return game;
  }

  async delete(gameId: string) {
    if (!gameId) {
      return;
    }

    await this.ready;

    const transaction = this.db.transaction(["games"], "readwrite");
    const gamesStore = transaction.objectStore("games");
    await gamesStore.delete(gameId);

    await transaction.done;
  }

  /**
   * GAME DATA
   */
  async saveGameData(gameId: string, gameData: any) {
    if (!gameId) {
      return;
    }

    await this.ready;

    gameData.id = gameId;

    const transaction = this.db.transaction(["gameData"], "readwrite");
    const gamesDataStore = transaction.objectStore("gameData");
    await gamesDataStore.put(gameData);

    await transaction.done;
  }

  async loadGameData(gameId: string) {
    if (!gameId) {
      return;
    }

    await this.ready;

    const transaction = this.db.transaction(["gameData"], "readwrite");
    const gamesDataStore = transaction.objectStore("gameData");
    const gameData = await gamesDataStore.get(gameId);

    await transaction.done;

    return gameData;
  }
}

export const gameManager = new GameManager();

// For resetting
(window as any).resetGameStore = async () => {
  const result = window.confirm(
    "Are you sure you want to reset the game store?"
  );

  if (!result) {
    return;
  }

  const transaction = gameManager.db.transaction(["games"], "readwrite");
  const gamesStore = transaction.objectStore("games");
  await gamesStore.clear();
  await transaction.done;

  window.location.reload();
};

(window as any).setGameLayout = async (gameId: string, layout: string) => {
  const gameConfig = await gameManager.load(gameId);

  gameConfig.layout = layout;

  await gameManager.save(gameConfig);

  window.location.reload();
};
