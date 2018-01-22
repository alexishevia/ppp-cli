const { DateTime } = require('luxon');

module.exports = {
  CONFIG_FILENAME: '.ppprc.json',
  NOW: DateTime.local(),
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',

  template: `*Progress*
Biggest accomplishments for yesterday
-
-

*Plans*
Top priorities for today
-
-

*Problems*
Issues that either prevented previous plans or could prevent future plans from being completed
-
-
`,
};
