import { getComponents } from "./components-md";
import { link } from "./templates/link";

export default function index() {
  return `
# Idling Engine

## Game Config/Code

This section details the properties of the game object and their configuration.

${link("More >", "/game")}

## Custom Components

If you are daring enough, this section explains how to implment your own custom components.

${link("More >", "/customComponents")}

## Components
${getComponents().join("\n\n")}
  `;
}
