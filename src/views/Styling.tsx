import { loadGameData } from "../lib/loadGameData";
import { data } from "../data/data";

export function Styling() {
  if (!data.gameData) {
    loadGameData();
  }

  return <div>Styling</div>;
}
