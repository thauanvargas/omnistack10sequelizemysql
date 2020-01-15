module.exports = function parseArrayAsString(arrayAsString) {
  arrayAsString.split(",").map(tech => tech.trim());
};
