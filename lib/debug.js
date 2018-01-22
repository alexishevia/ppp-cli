/**
 * debug()
 * Simple debugging function. Prints text to stdout.
 *
 * @param {String} str - message you want to output
 * @returns {Boolean} - true
 */
const debug = str => process.stdout.write(`${str}\n`);

module.exports = debug;
