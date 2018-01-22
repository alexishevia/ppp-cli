const todaysFilename = require('./todaysFilename');

/**
 * isTodaysPPP
 * Returns true if the filename matches today's date.
 *
 * @param {String} filename - the filename to be evaluated
 * @param {String} type - `DAILY` or `WEEKLY`.
 * @returns {Boolean} - true if filename matches today's date.
 */
const isTodaysPPP = (filename, type) => filename.includes(todaysFilename(type));

module.exports = isTodaysPPP;
