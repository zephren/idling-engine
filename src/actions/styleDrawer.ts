import { store } from "../lib/context";
import { saveLocalSettings } from "../lib/localSettings";

export function openStyleDrawer(options: any = {}) {
  store.state.localSettings.styleDrawerOpen = true;
  store.state.localSettings.previousHighlightComponents =
    store.state.localSettings.highlightComponents;
  store.state.localSettings.highlightComponents = false;

  if (options.componentName && options.styleId) {
    store.state.localSettings.styleDrawerComponentName = options.componentName;
    store.state.localSettings.styleDrawerStyleId = options.styleId;
  }

  saveLocalSettings();

  store.update();
}

export function closeStyleDrawer() {
  store.state.localSettings.styleDrawerOpen = false;
  store.state.localSettings.highlightComponents =
    store.state.localSettings.previousHighlightComponents;

  saveLocalSettings();

  store.update();
}
