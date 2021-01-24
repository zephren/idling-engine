import { Paper, Grid } from "@material-ui/core";
import { store } from "../../lib/context";
import { Toolbox } from "../../components/Toolbox";
import { SettingsPanel } from "../../components/SettingsPanel";

import { Container, Text } from "../../components/CustomComponents";

import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { AutoSave } from "./AutoSave";
import { components } from "../../lib/components";
import { HashRouter } from "react-router-dom";
import { data } from "../../data/data";
import { saveGameData } from "../../lib/saveGameData";
import { useEffect } from "react";
import { useSharedStyles } from "../../styles/shared";

function Content() {
  const { query } = useEditor();
  const classes = useSharedStyles();

  useEffect(() => {
    return () => {
      saveGameData();
    };
  }, []);

  // Setting the editor query data here so that it can be used elsewhere,
  // including outside of the editor context
  store.editorQuery = query;

  return (
    <Grid container>
      <Grid item xs className={classes.gameArea}>
        <HashRouter>
          <Frame data={data.gameData.layout}>
            {/*This is the default layout*/}
            <Element is={Container} padding={5} canvas>
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
