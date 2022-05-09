const requireGurads = require.context(".", true, /\.js$/);
const guards = {};

requireGurads.keys().forEach((fileName) => {
  if (fileName === "./index.js") return;

  const allGuradsFiles = requireGurads(fileName).default;
  Object.assign(guards, allGuradsFiles);
});
export default guards;
