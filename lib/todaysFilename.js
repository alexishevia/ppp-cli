const { NOW, DAILY, WEEKLY } = require('../constants');

const cache = {};

/**
 * getISODate()
 * Given a luxon date, will return the ISO format without time.
 *
 * @param {DateTime} luxonDate - a luxon DateTime instance
 * @returns {String} - the formatted string
 */
const getISODate = luxonDate => luxonDate.toString().split('T')[0];

/**
 * todaysFilename()
 * Generate the filename for today's PPP.
 *
 * @param {String} type - `DAILY` or `WEEKLY`.
 * @returns {String} - filename for today's PPP.
 */
const todaysFilename = (type) => {
  let result;

  if (cache[type]) {
    return cache[type];
  }

  switch (type) {
  case DAILY: {
    result = getISODate(NOW);
    break;
  }

  case WEEKLY: {
    /*
     * From Mon-Thu, use PPPs from past week.
     * From Fri-Sun, use PPPs from this week.
     */
    const weekStart = NOW.startOf('week').minus({
      week: (NOW.weekday >= 5) ? 0 : 1,
    });
    const weekEnd = weekStart.plus({ days: 6 });
    result = `weekly_${getISODate(weekStart)}_${getISODate(weekEnd)}`;
    break;
  }

  default:
    throw new Error(`Invalid type ${type} sent.`);
  }

  cache[type] = result;
  return result;
};

module.exports = todaysFilename;
