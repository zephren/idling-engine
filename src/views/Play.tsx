import { Editor, Frame } from "@craftjs/core";
import { useEffect } from "react";
import { HashRouter, useHistory } from "react-router-dom";
import { components } from "../data/components";
import { data } from "../data/data";
import { game } from "../data/game";
import { useSharedStyles } from "../styles/shared";

export function Play() {
  const history = useHistory();
  const classes = useSharedStyles();

  useEffect(() => {
    game.running = true;

    // If there is no game data, then switch to the editor
    if (!data.gameData) {
      console.error(new Error("No gameData routing to /edit"));
      history.push("/edit");
    }
  }, [history]);

  return (
    <div className={classes.gameArea}>
      <Editor resolver={components} enabled={false}>
        <HashRouter>
          <Frame data={data.gameData.layout}></Frame>
        </HashRouter>
      </Editor>
    </div>
  );
}
