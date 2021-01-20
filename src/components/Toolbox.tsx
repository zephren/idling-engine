import { Element, useEditor } from "@craftjs/core";
import { store } from "../lib/context";
import {
  Box,
  Typography,
  Grid,
  Button as MaterialButton,
  Switch,
  Chip,
} from "@material-ui/core";
import { AppBar, GridContainer, GridItem, PathContainer } from "./user";
import { Button } from "./user/Button";
import { Container } from "./user/Container";
import { Text } from "./user/Text";
import { VariableText } from "./user/VariableText";
import { Table } from "./user/Table";
import { useState } from "react";
import { Settings, StringSetting } from "./Settings";
import { saveLocalSettings } from "../lib/localSettings";

export const Toolbox = () => {
  const { connectors, actions } = useEditor();

  const [selectedComponent, setSelectedComponent] = useState<{
    component: any;
  } | null>(null);

  const getToolboxComponents = () => {
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

  return (
    <>
      <Box px={2} py={2}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={1}
        >
          <Box pb={2}>
            <Typography>Drag to add</Typography>
            Highlight components
            <Switch
              checked={store.state.localSettings.highlightComponents}
              onChange={() => {
                store.state.localSettings.highlightComponents = !store.state
                  .localSettings.highlightComponents;

                saveLocalSettings();

                store.update();
              }}
            />
          </Box>
          {getToolboxComponents().map((component) => {
            return (
              <Grid container direction="column" item>
                <MaterialButton
                  ref={component.ref}
                  variant="contained"
                  onClick={() => {
                    actions.selectNode();
                    setSelectedComponent({ component: component.component });
                  }}
                >
                  {component.name}
                </MaterialButton>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {selectedComponent ? (
        <BaseProperties component={selectedComponent.component} />
      ) : null}
    </>
  );
};

const propertyConfigDefinitions: {
  [key: string]: any;
} = {
  margin: {
    property: "margin",
    type: StringSetting,
  },
  padding: {
    property: "padding",
    type: StringSetting,
  },
  height: {
    property: "height",
    type: StringSetting,
  },
};

const BaseProperties = ({ component }: any) => {
  const { baseStyle } = component;

  if (!baseStyle) {
    return null;
  }

  const config = [];
  for (const property in baseStyle) {
    const definition = propertyConfigDefinitions[property];

    config.push(definition);
  }

  return (
    <Box mt={2} px={2} py={2}>
      <Grid container direction="column" spacing={0}>
        <Grid item>
          <Box pb={2}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle1">
                  Base Component Config
                </Typography>
              </Grid>
              <Grid item>
                <Chip size="small" color="primary" label={component.name} />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Settings
          config={config}
          properties={baseStyle}
          setProp={(callback: (props: any) => void) => {
            const newProps = Object.assign({}, baseStyle);
            callback(newProps);
            component.baseStyle = newProps;
            store.update();
          }}
        />
      </Grid>
    </Box>
  );
};
