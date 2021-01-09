import {
  componentProperties,
  ComponentPropertiesMap,
} from "../data/componentProperties";

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
    let { gameData } = localStorage;

    if (gameData) {
      gameData = JSON.parse(gameData);

      initializeComponentProperties();

      if (gameData.componentProperties) {
        loadComponentProperties(gameData.componentProperties);
      }

      return gameData;
    }

    return null;
  } catch (err) {
    return null;
  }
}
