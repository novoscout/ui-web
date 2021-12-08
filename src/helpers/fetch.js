// Using import() below for code-splitting and tree-shaking.

try {
  // This causes Node to raise an error.
  const realXMLHttpRequest = XMLHttpRequest;
  try {
    // This will cause a browser error if fetch is not available.
    const realFetch = fetch;
  } catch(err) {
    // Browser polyfill:
    fetch = async () => await import("whatwg-fetch").then(({default: fetch}) => fetch);
  }
} catch(err) {
  // Node polyfill (see webpack.common.js):
  fetch = async (...args) => await import("node-fetch").then(({default: fetch}) => fetch(...args));
}

module.exports = fetch;
