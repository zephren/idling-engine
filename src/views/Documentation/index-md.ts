import { documentation } from "../../data/documentation";

export default () => {
  const componentsDocs = Object.keys(documentation.components).map(
    (componentName) => {
      const component = documentation.components[componentName];

      return `[${component.name}](/components/${component.name})`;
    }
  );

  return `
# Idling Engine

## Components
${componentsDocs.join("\n\n")}
  `;
};
