import { useEffect } from "react";
import { saveGameData } from "../../lib/saveGameData";

export const AutoSave = () => {
  // Did mount / unmount
  useEffect(() => {
    console.debug("Starting autosave");

    const interval = setInterval(() => {
      saveGameData();
    }, 2000);

    return () => {
      console.debug("Stopping autosave");
      clearInterval(interval);
    };
  }, []);

  return null;
};
