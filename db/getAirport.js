const fs = require("fs");

const read = () => {
  const contents = fs.readFileSync(__dirname + "/airport.json", "utf-8");
  const data = JSON.parse(contents);
  return data;
};

module.exports = {
  read,
};
