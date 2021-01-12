import { Editor, Frame } from "@craftjs/core";
import { useEffect } from "react";
import { HashRouter, useHistory } from "react-router-dom";
import { components } from "../lib/components";
import { loadGameData } from "../lib/loadGameData";
import { data } from "../data/data";

export function Play() {
  const history = useHistory();

  if (!data.gameData) {
    loadGameData();
  }

  useEffect(() => {
    // If there is no game data, then switch to the editor
    if (!data.gameData) {
      console.error(new Error("No playGameData routing to /edit"));
      history.push("/edit");
    }
  }, [history]);

  return (
    <div>
      <Editor resolver={components} enabled={false}>
        <HashRouter>
          <Frame data={data.gameData.layout}></Frame>
        </HashRouter>
      </Editor>
    </div>
  );
}
