import { openDB } from "idb";

const version = 1;

class SaveManager {
  static pluginName = "savePluginIndexedDb";

  db: any;
  setReady: any;
  ready = new Promise<boolean>((resolve) => {
    this.setReady = resolve;
  });

  async init() {
    const db = await openDB("GameSaves", version, {
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
  }

  _upgrade(db: any, oldVersion: any, newVersion: any, transaction: any) {
    if (!db.objectStoreNames.contains("gameSaves")) {
      db.createObjectStore("gameSaves", {
        keyPath: "id",
      });
    }
  }

  _blocked() {}

  _blocking() {}

  _terminated() {}

  async saveGameData(gameId: string, gameData: any) {
    if (!gameId) {
      return;
    }

    await this.ready;

    gameData.id = gameId;

    const transaction = this.db.transaction(["gameSaves"], "readwrite");
    const gamesDataStore = transaction.objectStore("gameSaves");
    await gamesDataStore.put(gameData);

    await transaction.done;
  }

  async loadGameData(gameId: string) {
    if (!gameId) {
      return;
    }

    await this.ready;

    const transaction = this.db.transaction(["gameSaves"], "readwrite");
    const gamesDataStore = transaction.objectStore("gameSaves");
    const gameData = await gamesDataStore.get(gameId);

    await transaction.done;

    return gameData;
  }
}

(window as any).pluginRegistry.registerPlugin(SaveManager, "saveManager");

// For resetting
// (window as any).resetGameSaveStore = async () => {
//   const result = window.confirm(
//     "Are you sure you want to reset the game store?"
//   );

//   if (!result) {
//     return;
//   }

//   const transaction = gameManager.db.transaction(["games"], "readwrite");
//   const gamesStore = transaction.objectStore("games");
//   await gamesStore.clear();
//   await transaction.done;

//   window.location.reload();
// };
