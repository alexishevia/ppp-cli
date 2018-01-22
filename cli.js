#!/usr/bin/env node

/**
 * Create a PPP (Progress, Plans & Problems) file for today, then send it to
 * a Slack channel.
 *
 * Will read the following values from `~/.pprc.json`:
 * - dirpath: absolute path to the directory where PPPs are stored
 * - token: slack legacy token (https://api.slack.com/custom-integrations/legacy-tokens)
 * - channel: id of slack channel where PPP will be posted
 * - user: id of slack user to post as
 *
 * Note: you can specify a different config file with the `PPP_CONFIG_FILE`
 * environment variable.
 */

const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const debug = require('./lib/debug');
const sendSlackMessage = require('./lib/sendSlackMessage');
const openInEditor = require('./lib/openInEditor');
const readConfigFile = require('./lib/readConfigFile');
const getTodaysPPP = require('./lib/getTodaysPPP');
const getLastPPP = require('./lib/getLastPPP');
const { TODAY, template } = require('./constants');

const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);

/**
 * main()
 *
 * @returns {Promise} - promise
 */
const main = async () => {
  try {
    const config = await readConfigFile();
    const filepathTodaysPPP = path.join(config.dirpath, TODAY);

    // if today's PPP already exists, exit program.
    if (await getTodaysPPP(config.dirpath)) {
      debug(`Today's PPP already exists: ${filepathTodaysPPP}`);
      process.exit(0);
    }

    // read last PPP
    const oldContent = await getLastPPP(config.dirpath) || template;

    // copy the last PPP's content into today's PPP
    await writeFile(filepathTodaysPPP, oldContent, 'utf8');

    // edit today's PPP in vim
    await openInEditor(filepathTodaysPPP);

    // read today's PPP
    const content = await getTodaysPPP(config.dirpath);

    // if today's PPP is empty, or nothing changed from the last PPP, delete
    // today's PPP and exit program.
    if (!content || content === oldContent) {
      debug('Did not find new content for today\'s PPP.');
      await deleteFile(filepathTodaysPPP);
      process.exit(1);
    }

    // send today's PPP to slack
    await sendSlackMessage(content, config.token, config.channel, config.user);
  } catch (err) {
    debug(err);
    process.exit(1);
  }
};

main();
