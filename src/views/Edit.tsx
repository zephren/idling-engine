import { Paper, Grid } from "@material-ui/core";
import { store } from "../lib/context";
import { Toolbox } from "../components/Toolbox";
import { SettingsPanel } from "../components/SettingsPanel";

import { Container, Text } from "../components/user";

import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { AutoSave } from "../components/AutoSave";
import { components } from "../lib/components";
import { loadGameData } from "../lib/loadGameData";
import { HashRouter } from "react-router-dom";

function Content() {
  const { query } = useEditor();

  console.debug("Loading game data");
  const gameData = loadGameData() || {};
  const layoutData = gameData.layout;

  // Setting the editor query data here so that it can be used elsewhere,
  // including outside of the editor context
  store.editorQuery = query;

  return (
    <Grid container>
      <Grid item xs>
        <HashRouter>
          <Frame data={layoutData}>
            {/*This is the default layout*/}
            <Element is={Container} padding={5} background="#eee" canvas>
              <Text
                text={"Start dragging components in (and delete this one)"}
              />
            </Element>
          </Frame>
        </HashRouter>
      </Grid>
      <Grid item xs={3}>
        <Paper className={undefined}>
          <Toolbox />
          <SettingsPanel />
        </Paper>
      </Grid>
    </Grid>
  );
}

export function Edit() {
  return (
    <div>
      <Editor resolver={components}>
        <AutoSave />
        <Content />
      </Editor>
    </div>
  );
}
