import { useEffect } from "react";
import { saveGameConfig } from "../../lib/saveGameConfig";

export const AutoSave = () => {
  // Did mount / unmount
  useEffect(() => {
    console.debug("Starting autosave");

    const interval = setInterval(() => {
      saveGameConfig();
    }, 2000);

    return () => {
      console.debug("Stopping autosave");
      clearInterval(interval);
    };
  }, []);

  return null;
};
