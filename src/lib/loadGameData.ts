import {
  componentProperties,
  ComponentPropertiesMap,
} from "../data/componentProperties";
import { customStyles } from "../data/customStyles";
import { data } from "../data/data";

function loadComponentProperties(
  newComponentProperties: ComponentPropertiesMap
) {
  for (const componentName in componentProperties) {
    const properties = componentProperties[componentName];
    const newProperties = newComponentProperties[componentName];

    if (newProperties) {
      const { styles } = newProperties;

      if (styles) {
        properties.styles.base = {
          ...properties.styles.base,
          ...styles.base,
        };

        for (const style in styles) {
          // Once additional styles are implemented apply them to the styles object
        }
      }
    }
  }
}

function initializeComponentProperties() {
  for (const componentName in componentProperties) {
    const properties = componentProperties[componentName];

    const { styles, allowedStyleProperties } = properties;

    styles.base = {
      ...styles.base,
    };

    for (const propertyName in allowedStyleProperties) {
      const value = allowedStyleProperties[propertyName];

      if (value) {
        styles.base[propertyName] = value;
      }
    }
  }
}

export function loadGameData() {
  try {
    let storedGameData = localStorage.gameData;

    if (storedGameData) {
      storedGameData = JSON.parse(storedGameData);

      initializeComponentProperties();

      if (storedGameData.componentProperties) {
        loadComponentProperties(storedGameData.componentProperties);
      }

      if (storedGameData.customStyles) {
        Object.assign(customStyles, storedGameData.customStyles);
      }

      data.gameData = storedGameData;

      return storedGameData;
    }

    console.warn("No game data loaded");
  } catch (err) {
    console.error(err);
  }

  data.gameData = {};
  return null;
}
