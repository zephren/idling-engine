import { store } from "../../lib/context";
import { Toolbox } from "../../components/Toolbox";
import { SettingsPanel } from "../../components/SettingsPanel";

import { Container, Text } from "../../components/CustomComponents";

import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { AutoSave } from "./AutoSave";
import { pluginRegistry } from "../../lib/PluginRegistry";
import { HashRouter } from "react-router-dom";
import { data } from "../../data/data";
import { saveGameConfig } from "../../lib/saveGameConfig";
import { useEffect } from "react";
import { useSharedStyles } from "../../styles/shared";
import { game } from "../../data/game";

function Content() {
  const { query } = useEditor();
  const classes = useSharedStyles();

  useEffect(() => {
    game.running = false;

    return () => {
      game.running = false;
      saveGameConfig();
    };
  }, []);

  // Setting the editor query data here so that it can be used elsewhere,
  // including outside of the editor context
  store.editorQuery = query;

  return (
    <>
      <div style={{ position: "absolute", width: "80%", height: "100%" }}>
        <div className={classes.gameArea}>
          {/*Router for the components in the game*/}
          <HashRouter>
            <Frame data={data.gameConfig.layout}>
              {/*This is the default layout*/}
              <Element is={Container} padding={5} canvas>
                <Text
                  text={"Start dragging components in (and delete this one)"}
                />
              </Element>
            </Frame>
          </HashRouter>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: "0%",
          width: "20%",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Toolbox />
        <SettingsPanel />
      </div>
    </>
  );
}

export function Edit() {
  return (
    <Editor resolver={pluginRegistry.components}>
      {store.state.mode !== "play" ? <AutoSave /> : null}
      <Content />
    </Editor>
  );
}
