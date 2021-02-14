const { exec } = require("child_process");

const _5minutes = 1000 * 10;

setInterval(() => {
  console.log("Copying idling-engine-core src");
  exec(
    "cp -R ./node_modules/idling-engine-core/src ../idling-engine-core",
    () => {
      console.log("Done");
    }
  );
}, _5minutes);
