import { useEffect } from "react";
import { saveLayout } from "../lib/saveLayout";

export const AutoSave = () => {
  // Did mount / unmount
  useEffect(() => {
    console.debug("Starting autosave");

    const interval = setInterval(() => {
      saveLayout();
    }, 10000);

    return () => {
      console.debug("Stopping autosave");
      clearInterval(interval);
    };
  }, []);

  return null;
};
