import { getComponents } from "./components-md";
import { link } from "./templates/link";

export default function index() {
  return `
# Idling Engine

## ${link("Game Config/Code", "/game")}

This section comprises of details the properties of the game object and their configuration.

## ${link("Components", "/components")}
${getComponents().join("\n\n")}
  `;
}
