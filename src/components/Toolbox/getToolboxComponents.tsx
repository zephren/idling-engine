import { EventConnectors } from "@craftjs/core";
import { components } from "../../data/components";

export const getToolboxComponents = (connectors: EventConnectors) => {
  return [
    ...Object.keys(components).reduce((acc: any[], componentName: any) => {
      const component = components[componentName];

      if (component.toolboxItem) {
        acc.push(component.toolboxItem(connectors));
      }

      return acc;
    }, []),
  ];
};
