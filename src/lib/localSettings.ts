import { store } from "./context";
import { dataStorage } from "./dataStorage";

export function loadLocalSettings() {
  store.state.localSettings = dataStorage.get("localSettings", undefined);
}

export function saveLocalSettings() {
  dataStorage.set("localSettings", store.state.localSettings);
}
