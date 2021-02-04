import { LocalSettingsFlags, store } from "../lib/context";
import { saveLocalSettings } from "../lib/localSettings";

export function toggleLocalSetting(settingProperty: keyof LocalSettingsFlags) {
  store.state.localSettings.flags[settingProperty] = !store.state.localSettings
    .flags[settingProperty];

  saveLocalSettings();

  store.update();
}
