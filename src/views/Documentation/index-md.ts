import { getComponents } from "./components-md";

export default () => {
  return `
# Idling Engine

## Components
${getComponents().join("\n\n")}
  `;
};
