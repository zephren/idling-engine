// Mutate console for better logging

import EventEmitter from "events";

export const logEvents = new EventEmitter();

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

      logEvents.emit("error", args);
    }
  };
})();

export default console;
