const os = require('os');
const path = require('path');
const parse = require('minimist');
const { DAILY, WEEKLY, CONFIG_FILENAME } = require('../constants');

/**
 * parseArgs()
 * parse command line arguments
 *
 * @returns {Object} - parsed options
 *
 */
const parseArgs = () => {
  const args = parse(process.argv.slice(2), {
    string: ['-F'],
    boolean: ['-w', '--weekly'],
  });
  return {
    type: (args.w || args.weekly) ? WEEKLY : DAILY,
    configFilePath: args.F || path.join(os.homedir(), CONFIG_FILENAME),
  };
};

module.exports = parseArgs;
