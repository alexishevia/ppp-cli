const { promisify } = require('util');
const fs = require('fs');
const isTodaysPPP = require('./isTodaysPPP');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

/**
 * getTodaysPPP()
 * Return the content for today's PPP (if it exists)
 *
 * @param {String} dirpath - absolute path to directory where PPP files are stored
 * @returns {Promise} - resolves with today's PPP content or an empty string
 */
const getTodaysPPP = dirpath => (
  readdir(dirpath)
  .then(files => files.find(isTodaysPPP))
  .then(filename => (
    filename ? readFile(`${dirpath}/${filename}`, 'utf8') : ''
  ))
);

module.exports = getTodaysPPP;
