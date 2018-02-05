const { DateTime } = require('luxon');
const os = require('os');
const path = require('path');

module.exports = {
  CONFIG_FILEPATH: path.join(os.homedir(), '.ppprc.json'),
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
