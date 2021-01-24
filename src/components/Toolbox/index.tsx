import { useEditor } from "@craftjs/core";
import { store } from "../../lib/context";
import {
  Box,
  Typography,
  Grid,
  Button as MaterialButton,
  Switch,
  Chip,
} from "@material-ui/core";

import { useState } from "react";
import { Settings, StringSetting } from "../Settings";
import { saveLocalSettings } from "../../lib/localSettings";
import { getToolboxComponents } from "./getToolboxComponents";

export const Toolbox = () => {
  const { connectors, actions } = useEditor();

  const [selectedComponent, setSelectedComponent] = useState<{
    component: any;
  } | null>(null);

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
          {getToolboxComponents(connectors).map((component) => {
            return (
              <Grid key={component.name} container direction="column" item>
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
