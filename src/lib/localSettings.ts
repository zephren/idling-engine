import { store } from "./context";
import { dataStorage } from "./dataStorage";

export function loadLocalSettings() {
  const storedLocalSettings = dataStorage.get("localSettings", undefined);

  // Apply the stored settings or just use the defaults
  if (storedLocalSettings) {
    console.groupCollapsed("Stored Local Settings");
    console.log(JSON.stringify(storedLocalSettings, null, 2));
    store.state.localSettings = Object.assign(
      store.state.localSettings,
      storedLocalSettings
    );
    console.groupEnd();
  }
}

export function saveLocalSettings() {
  dataStorage.set("localSettings", store.state.localSettings);
}
