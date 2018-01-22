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
 * @param {String} type - `DAILY` or `WEEKLY`.
 * @returns {Promise} - resolves with today's PPP content or an empty string
 */
const getTodaysPPP = (dirpath, type) => (
  readdir(dirpath)
  .then(files => files.find(f => isTodaysPPP(f, type)))
  .then(filename => (
    filename ? readFile(`${dirpath}/${filename}`, 'utf8') : ''
  ))
);

module.exports = getTodaysPPP;
