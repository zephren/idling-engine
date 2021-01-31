import { documentation } from "../../data/documentation";

export function getComponents() {
  const componentsDocs = Object.keys(documentation.components).map(
    (componentName) => {
      const component = documentation.components[componentName];

      return `[${component.name}](/components/${component.name})`;
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
