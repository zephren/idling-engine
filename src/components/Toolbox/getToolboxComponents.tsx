import { EventConnectors } from "@craftjs/core";
import { pluginRegistry } from "../../lib/PluginRegistry";

export const getToolboxComponents = (connectors: EventConnectors) => {
  return [
    ...pluginRegistry.componentsArray.reduce((acc: any[], component) => {
      if (component.toolboxItem) {
        acc.push(component.toolboxItem(connectors));
      }

      return acc;
    }, []),
  ];
};
