const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const { CONFIG_FILEPATH } = require('../constants');

/**
 * readConfigFile
 * Parse config file.
 *
 * @returns {Object} - configuration object
 */
const readConfigFile = () => (
  readFile(CONFIG_FILEPATH, 'utf8')
  .then(content => JSON.parse(content))
  .then((config) => {
    ['dirpath', 'token', 'channel', 'user'].forEach((key) => {
      if (!config[key]) {
        throw new Error(`Missing value for ${key} in config file.`);
      }
    });
    return config;
  })
);

module.exports = readConfigFile;
