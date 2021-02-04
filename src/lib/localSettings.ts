import { store } from "./context";
import { dataStorage } from "./dataStorage";

export function loadLocalSettings() {
  const storedLocalSettings = dataStorage.get("localSettings", undefined);

  // Apply the stored settings or just use the defaults
  if (storedLocalSettings) {
    console.log("storedLocalSettings", storedLocalSettings);
    store.state.localSettings = Object.assign(
      store.state.localSettings,
      storedLocalSettings
    );
  }
}

export function saveLocalSettings() {
  dataStorage.set("localSettings", store.state.localSettings);
}
