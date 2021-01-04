// Mutate console for better logging

const LogLevels = {
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
};

const c = console as any;
const co = { ...console };

c.logLevels = LogLevels;
c.logLevel = LogLevels.INFO;

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
  }
};

export default console;
