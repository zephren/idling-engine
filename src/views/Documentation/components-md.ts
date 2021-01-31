import { documentation } from "../../data/documentation";

export function getComponents() {
  const componentsDocs = Object.keys(documentation.components).map(
    (componentName) => {
      const component = documentation.components[componentName];

      return `[${component.componentName}](/components/${component.componentName})`;
    }
  );

  return componentsDocs;
}

export default () => {
  return `
# Components
${getComponents().join("\n\n")}
`;
};
