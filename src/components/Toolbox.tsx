import { Element, useEditor } from "@craftjs/core";
import { store } from "../lib/context";
import {
  Box,
  Typography,
  Grid,
  Button as MaterialButton,
  Switch,
} from "@material-ui/core";
import { AppBar, PathContainer } from "./user";
import { Button } from "./user/Button";
import { Card } from "./user/Card";
import { Container } from "./user/Container";
import { Text } from "./user/Text";
import { VariableText } from "./user/VariableText";
import { Table } from "./user/Table";

export const Toolbox = () => {
  const { connectors } = useEditor();

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
            ref={(ref) =>
              connectors.create(ref, <Button text="Click me" size="small" />)
            }
            variant="contained"
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
                <Element is={Container} padding={20} canvas />
              )
            }
            variant="contained"
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
      </Grid>
    </Box>
  );
};
