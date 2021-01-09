import { Element, useEditor } from "@craftjs/core";
import { store } from "../lib/context";
import {
  Box,
  Typography,
  Grid,
  Button as MaterialButton,
  Switch,
} from "@material-ui/core";
import { AppBar, GridContainer, PathContainer } from "./user";
import { Button } from "./user/Button";
import { Card } from "./user/Card";
import { Container } from "./user/Container";
import { Text } from "./user/Text";
import { VariableText } from "./user/VariableText";
import { Table } from "./user/Table";
import { useState } from "react";
import { Settings, StringSetting } from "./Settings";
import { componentProperties } from "../data/componentProperties";

export const Toolbox = () => {
  const { connectors } = useEditor();

  const [selectedComponent, setSelectedComponent] = useState("");

  return (
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
            checked={store.state.highlightComponents}
            onChange={() => {
              store.state.highlightComponents = !store.state
                .highlightComponents;
              store.update();
            }}
          />
        </Box>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => connectors.create(ref, <Button />)}
            variant="contained"
            onClick={() => {
              setSelectedComponent("Button");
            }}
          >
            Button
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}
            variant="contained"
          >
            Text
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) =>
              connectors.create(
                ref,
                <Element is={Container} canvas>
                  <Text text="Container" />
                </Element>
              )
            }
            variant="contained"
            onClick={() => {
              setSelectedComponent("Container");
            }}
          >
            Container
          </MaterialButton>
        </Grid>
        {/* <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => connectors.create(ref, <Card />)}
            variant="contained"
          >
            Card
          </MaterialButton>
        </Grid> */}
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => connectors.create(ref, <VariableText />)}
            variant="contained"
          >
            Variable Text
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => connectors.create(ref, <AppBar />)}
            variant="contained"
          >
            App Bar
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) =>
              connectors.create(ref, <Element is={PathContainer} canvas />)
            }
            variant="contained"
          >
            Path Container
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => connectors.create(ref, <Table />)}
            variant="contained"
          >
            Table
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => connectors.create(ref, <GridContainer />)}
            variant="contained"
          >
            Grid Container
          </MaterialButton>
        </Grid>
      </Grid>
      {selectedComponent ? (
        <BaseProperties componentName={selectedComponent} />
      ) : null}
    </Box>
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
};

const BaseProperties = ({ componentName }: any) => {
  const { styles, allowedStyleProperties } = componentProperties[componentName];

  const config = [];
  for (const property in allowedStyleProperties) {
    const definition = propertyConfigDefinitions[property];

    config.push(definition);
  }

  return (
    <div>
      {componentName}
      <Settings
        config={config}
        properties={styles.base}
        setProp={(callback: (props: any) => void) => {
          const newProps = Object.assign({}, styles.base);
          callback(newProps);
          styles.base = newProps;
          store.update();
        }}
      />
    </div>
  );
};
