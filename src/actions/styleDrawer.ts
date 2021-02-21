import { data } from "../data/data";
import { store } from "../lib/context";
import { saveLocalSettings } from "../lib/localSettings";

export function openStyleDrawer(options: any = {}) {
  store.state.localSettings.flags.styleDrawerOpen = true;
  store.state.localSettings.flags.previousHighlightComponents =
    store.state.localSettings.flags.highlightComponents;
  store.state.localSettings.flags.highlightComponents = false;

  if (options.componentName) {
    const { customStyles } = data.gameConfig;

    store.state.localSettings.styleDrawerComponentName = options.componentName;
    store.state.localSettings.styleDrawerStyleId = options.styleId || "";

    customStyles[options.componentName] =
      customStyles[options.componentName] || {};
  }

  saveLocalSettings();

  store.update();
}

export function closeStyleDrawer() {
  store.state.localSettings.flags.styleDrawerOpen = false;
  store.state.localSettings.flags.highlightComponents =
    store.state.localSettings.flags.previousHighlightComponents;

  saveLocalSettings();

  store.update();
}
