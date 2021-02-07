import configure from "./configure";
import data from "./data";
import actions from "./actions";
import dataSources from "./dataSources";
import visibilitySources from "./visibilitySources";
import initialize from "./initialize";
import initializeGameData from "./initializeGameData";
import tick from "./tick";

export default function game() {
  return `
# Game

Every game starts with a \`game\` object that you configure through the code editor. The following sections will explain how to use the the various properties of of the \`game\` object.

${configure()}
${data()}
${actions()}
${dataSources()}
${visibilitySources()}
${initialize()}
${initializeGameData()}
${tick()}
`;
}
