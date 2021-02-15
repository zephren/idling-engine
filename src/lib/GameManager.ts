import { openDB, deleteDB, wrap, unwrap } from "idb";

const version = 6;

class GameManager {
  db: any;
  setReady: any;
  ready = new Promise<boolean>((resolve) => {
    this.setReady = resolve;
  });

  async init() {
    const db = await openDB("GameData", version, {
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
    console.log("UPGRADE!");

    const gameStore = db.createObjectStore("games", { keyPath: "id" });

    gameStore.transaction.oncomplete = function (event: any) {
      Promise.resolve(this.ready);
    };
  }

  _blocked() {}

  _blocking() {}

  _terminated() {}

  async getAll() {
    await this.ready;

    // console.log("GETTING ALL GAMES");

    const transaction = this.db.transaction(["games"], "readwrite");
    const gamesStore = transaction.objectStore("games");
    const games = await gamesStore.getAll();

    await transaction.done;

    return games;
  }

  async save(gameData: any) {
    await this.ready;

    // console.log("INDEX DB SAVE", gameData.id, gameData);

    const transaction = this.db.transaction(["games"], "readwrite");
    const gamesStore = transaction.objectStore("games");
    await gamesStore.put(gameData);

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
}

export const gameManager = new GameManager();
