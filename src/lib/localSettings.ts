import { store } from "./context";

export function loadLocalSettings() {
  if (localStorage.localSettings) {
    store.state.localSettings = JSON.parse(localStorage.localSettings);
  }
}

export function saveLocalSettings() {
  localStorage.localSettings = JSON.stringify(store.state.localSettings);
}
