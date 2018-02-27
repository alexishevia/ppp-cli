const { promisify } = require('util');
const fs = require('fs');

const isTodaysPPP = require('./isTodaysPPP');
const todaysFilename = require('./todaysFilename');
const { template: defaultTemplate, DAILY, WEEKLY } = require('../constants');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

/**
 * getDailyTemplate
 * Return the template for today's DAILY PPP.
 * Will try getting the previous PPP and copying its contents.
 *
 * @param {String} dirpath - absolute path to directory where PPP files are stored
 * @returns {Promise} - resolves with the template as a string.
 */
const getDailyTemplate = dirpath => (
  readdir(dirpath)
  .then(files => files.filter(f => f.match(/^\d{4}-\d{2}-\d{2}$/)))
  .then(files => files.filter(f => !isTodaysPPP(f, DAILY)).sort().pop())
  .then(filename => (
    filename ? readFile(`${dirpath}/${filename}`, 'utf8') : ''
  ))
);

/**
 * getWeeklyTemplate
 * Return the template for today's WEEKLY PPP.
 * Will try getting all PPPs for the previous week and merging their contents.
 *
 * @param {String} dirpath - absolute path to directory where PPP files are stored
 * @returns {Promise} - resolves with the template as a string.
 */
const getWeeklyTemplate = (dirpath) => {
  const [, start, end] = todaysFilename(WEEKLY).split('_');
  return readdir(dirpath)
  .then(filenames => filenames.filter((filename) => {
    const date = new Date(filename);
    return date >= new Date(start) && date <= new Date(end);
  }))
  .then(filenames => filenames.map(filename => `${dirpath}/${filename}`))
  .then(filepaths => Promise.all(filepaths.map(fp => readFile(fp, 'utf8'))))
  .then(results => results.join('\n\n'));
};

/**
 * getTemplate
 * Return the template for today's PPP.
 * Will use different logic depending on the type.
 *
 * @param {String} dirpath - absolute path to directory where PPP files are stored
 * @param {String} type - `DAILY` or `WEEKLY`.
 * @returns {Promise} - resolves with the template as a string.
 */
const getTemplate = (dirpath, type) => {
  const fn = (type === DAILY) ? getDailyTemplate : getWeeklyTemplate;
  return fn(dirpath).then(content => content || defaultTemplate);
};

module.exports = getTemplate;
