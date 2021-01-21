import { customStyles } from "../data/customStyles";
import { store } from "../lib/context";
import { saveLocalSettings } from "../lib/localSettings";

export function openStyleDrawer(options: any = {}) {
  store.state.localSettings.styleDrawerOpen = true;
  store.state.localSettings.previousHighlightComponents =
    store.state.localSettings.highlightComponents;
  store.state.localSettings.highlightComponents = false;

  if (options.componentName) {
    store.state.localSettings.styleDrawerComponentName = options.componentName;
    store.state.localSettings.styleDrawerStyleId = options.styleId || "";

    customStyles[options.componentName] =
      customStyles[options.componentName] || {};
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
