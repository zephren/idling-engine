import { Editor, Frame } from "@craftjs/core";
import { useEffect, useState } from "react";
import { HashRouter, useHistory } from "react-router-dom";
import { components } from "../lib/components";
import { loadGameData } from "../lib/loadGameData";

export function Play() {
  const [gameData, setGameData] = useState({} as any);
  const history = useHistory();

  useEffect(() => {
    const playGameData = loadGameData();

    // If there is no game data, then switch to the editor
    if (!playGameData) {
      history.push("/edit");
    }

    setGameData(playGameData);
  }, [history]);

  return (
    <div>
      <Editor resolver={components} enabled={false}>
        <HashRouter>
          <Frame data={gameData.layout}></Frame>
        </HashRouter>
      </Editor>
    </div>
  );
}
