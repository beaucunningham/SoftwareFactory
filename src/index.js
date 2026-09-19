const { main } = require("./factory");

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { main };
