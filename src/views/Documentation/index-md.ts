import { getComponents } from "./components-md";

export default function index() {
  return `
# Idling Engine

## Components
${getComponents().join("\n\n")}
  `;
}
