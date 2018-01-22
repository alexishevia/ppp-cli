const CONFIG_FILENAME = '.ppprc.json';
const moment = require('moment');

const os = require('os');
const path = require('path');

module.exports = {
  CONFIG_FILEPATH: process.env.PPP_CONFIG_FILE ||
                   path.join(os.homedir(), CONFIG_FILENAME),
  TODAY: moment().format('YYYY-MM-DD'),
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
