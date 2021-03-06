import { Editor, Frame } from "@craftjs/core";
import { useEffect } from "react";
import { HashRouter, useHistory } from "react-router-dom";
import { pluginRegistry } from "../lib/PluginRegistry";
import { data } from "../data/data";
import { game } from "../data/game";
import { useSharedStyles } from "../styles/shared";

export function Play() {
  const history = useHistory();
  const classes = useSharedStyles();

  useEffect(() => {
    game.running = true;

    // If there is no game data, then switch to the editor
    if (!data.gameConfig) {
      console.error(new Error("No gameConfig routing to /edit"));
      history.push("/edit");
    }

    return () => {
      game.running = false;
    };
  }, [history]);

  return (
    <div className={classes.gameArea}>
      <Editor resolver={pluginRegistry.components} enabled={false}>
        <HashRouter>
          <Frame data={data.gameConfig.layout}></Frame>
        </HashRouter>
      </Editor>
    </div>
  );
}
