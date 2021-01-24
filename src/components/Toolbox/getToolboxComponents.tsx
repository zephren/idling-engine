import { Element, EventConnectors } from "@craftjs/core";
import {
  AppBar,
  Button,
  Container,
  GridContainer,
  GridItem,
  PathContainer,
  Table,
  Text,
  VariableText,
} from "../CustomComponents";

export const getToolboxComponents = (connectors: EventConnectors) => {
  return [
    {
      name: "Button",
      component: Button,
      ref: (ref: any) => connectors.create(ref, <Button />),
    },
    {
      name: "Text",
      component: Text,
      ref: (ref: any) => connectors.create(ref, <Text text="Hi world" />),
    },
    {
      name: "Container",
      component: Container,
      ref: (ref: any) =>
        connectors.create(
          ref,
          <Element is={Container} canvas>
            <Text text="Container" />
          </Element>
        ),
    },
    {
      name: "Variable Text",
      component: VariableText,
      ref: (ref: any) => connectors.create(ref, <VariableText />),
    },
    {
      name: "App Bar",
      component: AppBar,
      ref: (ref: any) => connectors.create(ref, <AppBar />),
    },
    {
      name: "Path Container",
      component: PathContainer,
      ref: (ref: any) =>
        connectors.create(ref, <Element is={PathContainer} canvas />),
    },
    {
      name: "Table",
      component: Table,
      ref: (ref: any) => connectors.create(ref, <Table />),
    },
    {
      name: "Grid Container",
      component: GridContainer,
      ref: (ref: any) =>
        connectors.create(
          ref,
          <Element is={GridContainer} canvas>
            <Element is={GridItem} canvas>
              <Text text="Grid Item" />
            </Element>
            <Element is={GridItem} canvas>
              <Text text="Grid Item" />
            </Element>
          </Element>
        ),
    },
    {
      name: "Grid Item",
      component: GridItem,
      ref: (ref: any) =>
        connectors.create(
          ref,
          <Element is={GridItem} canvas>
            <Text text="Grid Item" />
          </Element>
        ),
    },
    // {
    //   name: "Card",
    //   component: Card,
    //   ref: (ref) => connectors.create(ref, <Card />),
    // },
  ];
};
