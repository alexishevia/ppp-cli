const _ = require('lodash');
const parse = require('minimist');
const { DAILY, WEEKLY, CONFIG_FILEPATH } = require('../constants');

const helpStr = `
ppp-cli [options]

Options:
-w, --weekly    Generate a weekly PPP (by default a daily PPP is generated).
-F <filename>   Specifies an alternative configuration file. Default is '~/.pprc.json'
-h, --help      Render this help message.
`;

const validArgs = [
  '_', // placeholder for arguments without an option associated
  'F', // config file path
  'w', 'weekly', // create a weekly ppp
  'h', 'help', // render help string
];

/**
 * wasHelpRequested()
 * returns true if any of the 'help' arguments was passed
 *
 * @param {Object} args - arguments as returned by `minimist`
 * @return {Boolean} - true if help was requested, false otherwise
 */
const wasHelpRequested = args => !!(args.h || args.help);

/**
 * exitIfHelpWasRequested()
 * if help was requested, print the help string and exit the process
 *
 * @param {Object} args - arguments as returned by `minimist`
 * @returns {undefined}
 */
const exitIfHelpWasRequested = (args) => {
  if (wasHelpRequested(args)) {
    process.stdout.write(`${helpStr}\n`);
    process.exit(0);
  }
};

/**
 * exitIfUnknownArgs()
 * exit process if an unknown argument is found
 *
 * @param {Object} args - arguments as returned by `minimist`
 * @returns {undefined}
 */
const exitIfUnknownArgs = (args) => {
  const unknown = _.get(
    args,
    '_[0]', // we should have no arguments unassociated with an option
    Object.keys(args).find(arg => !validArgs.includes(arg)),
  );
  if (unknown) {
    process.stderr.write(`Unknown argument: ${unknown}\n`);
    process.exit(1);
  }
};

/**
 * wasWeeklyPPPRequested
 * returns true if a weekly PPP was requested
 *
 * @param {Object} args - arguments as returned by `minimist`
 * @returns {Boolean} - true if weekly PPP was requested, false otherwise
 */
const wasWeeklyPPPRequested = args => (
  !!(_.get(args, 'w') || _.get(args, 'weekly'))
);

/**
 * getPPPType
 * returns the type of PPP requested
 *
 * @param {Object} args - arguments as returned by `minimist`
 * @returns {String} - type of PPP requested
 */
const getPPPType = (args) => {
  if (wasWeeklyPPPRequested(args)) {
    return WEEKLY;
  }
  return DAILY;
};

/**
 * getConfigFilePath()
 * returns the path to the config file to use
 *
 * @param {Object} args - arguments as returned by `minimist`
 * @returns {String} - path to the config file
 */
const getConfigFilePath = args => args.F || CONFIG_FILEPATH;

/**
 * parseArgs()
 * parse command line arguments
 *
 * @returns {Object} - parsed options
 *
 */
const parseArgs = () => {
  const args = parse(process.argv.slice(2));

  exitIfHelpWasRequested(args);
  exitIfUnknownArgs(args);

  return {
    type: getPPPType(args),
    configFilePath: getConfigFilePath(args),
  };
};

module.exports = parseArgs;
