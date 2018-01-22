const { promisify } = require('util');
const fs = require('fs');
const isTodaysPPP = require('./isTodaysPPP');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

/**
 * getLastPPP()
 * Return the content for the most recent PPP that exists (excluding today's PPP)
 *
 * @param {String} dirpath - absolute path to directory where PPP files are stored
 * @returns {Promise} - resolves with the oldest PPP's content or an empty string.
 */
const getLastPPP = dirpath => (
  readdir(dirpath)
  .then(files => files.filter(f => !isTodaysPPP(f)).sort().pop())
  .then(filename => (
    filename ? readFile(`${dirpath}/${filename}`, 'utf8') : ''
  ))
);

module.exports = getLastPPP;
