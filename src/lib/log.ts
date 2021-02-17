// Mutate console for better logging

import { store } from "./context";

(() => {
  // console that is going to be modified
  const c = console as any;

  // Check if the console has already been customized
  // Prevents repeatedly overriding with hot reloading
  if (!c._customized) {
    // Save the original console so that it can be preferenced
    c.co = { ...console };
    c._customized = true;
  }

  let co = c.co;

  const LogLevels = {
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
  };

  c.logLevels = LogLevels;
  c.logLevel = LogLevels.DEBUG;

  c.debug = (...args: any) => {
    if (c.logLevel <= LogLevels.DEBUG) {
      co.debug("DEBUG", ...args);
    }
  };

  c.info = (...args: any) => {
    if (c.logLevel <= LogLevels.INFO) {
      co.info("INFO", ...args);
    }
  };

  c.warn = (...args: any) => {
    if (c.logLevel <= LogLevels.WARN) {
      co.warn("WARN", ...args);
    }
  };

  c.error = (...args: any) => {
    if (c.logLevel <= LogLevels.ERROR) {
      co.error("ERROR", ...args);

      if (args[0]?.message && args[0]?.stack) {
        const { message, stack } = args[0];
        let snackbarMessage = message;

        const stackLines = stack.split("\n");

        for (let i = 0; i < 2; i++) {
          const line = stackLines[i];
          if (line.includes("eval")) {
            console.log(line);
            const matches = line.match(/(\d+):(\d+)/g);

            if (matches.length) {
              const match = matches[matches.length - 1].split(":");
              snackbarMessage += ` (Line: ${match[0]}, Col: ${match[1]})`;
            }
          }
        }

        store.enqueueSnackbar(snackbarMessage, {
          variant: "error",
          preventDuplicate: true,
        });
      }
    }
  };
})();

export default console;
