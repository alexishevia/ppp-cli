const { TODAY } = require('../constants');

/**
 * isTodaysPPP
 * Returns true if the filename matches today's date.
 *
 * @param {String} filename - the filename to be evaluated
 * @returns {Boolean} - true if filename matches today's date.
 */
const isTodaysPPP = filename => filename.match(new RegExp(TODAY));

module.exports = isTodaysPPP;
