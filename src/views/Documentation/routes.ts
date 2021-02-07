import { documentation } from "../../data/documentation";
import components from "./components-md";
import game from "./game-md";
import customComponents from "./customComponents-md";
import index from "./index-md";

export function routes() {
  return [
    {
      path: "/components/:componentName",
      breadcrumbs: (history: any) => {
        const { component } = documentation.components[
          history.match.params.componentName
        ];

        return [
          ["Documentation", ""],
          ["Components", "components"],
          [component.componentName, component.componentName],
        ];
      },
      children: (history: any) => {
        const { component } = documentation.components[
          history.match.params.componentName
        ];

        return component.documentation.md;
      },
    },
    {
      path: "/components",
      breadcrumbs: () => [
        ["Documentation", ""],
        ["Components", "components"],
      ],
      children: () => components(),
    },
    {
      path: "/game",
      breadcrumbs: () => [
        ["Documentation", ""],
        ["Game", "game"],
      ],
      children: () => game(),
    },
    {
      path: "/customComponents",
      breadcrumbs: () => [
        ["Documentation", ""],
        ["Custom Components", "customComponents"],
      ],
      children: () => customComponents(),
    },
    {
      path: "/",
      breadcrumbs: () => [["Documentation", ""]],
      children: () => index(),
    },
  ];
}
