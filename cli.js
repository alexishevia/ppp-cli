#!/usr/bin/env node

/*
 * Create a PPP (Progress, Plans & Problems) file, and send its contents to a
 * Slack channel.
 */

const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const parseArgs = require('./lib/parseArgs');

const debug = require('./lib/debug');
const sendSlackMessage = require('./lib/sendSlackMessage');
const openInEditor = require('./lib/openInEditor');
const readConfigFile = require('./lib/readConfigFile');
const getTodaysPPP = require('./lib/getTodaysPPP');
const getTemplate = require('./lib/getTemplate');
const todaysFilename = require('./lib/todaysFilename');

const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);

/**
 * main()
 *
 * @returns {Promise} - promise
 */
const main = async () => {
  try {
    // parse command line arguments
    const { type, configFilePath } = parseArgs();

    // read config file
    const config = await readConfigFile(configFilePath);
    const todaysFilepath = path.join(config.dirpath, todaysFilename(type));

    // if today's PPP already exists, exit program.
    if (await getTodaysPPP(config.dirpath, type)) {
      debug(`PPP already exists: ${todaysFilepath}`);
      process.exit(0);
    }

    // copy template into today's PPP
    const template = await getTemplate(config.dirpath, type);
    await writeFile(todaysFilepath, template, 'utf8');

    // edit today's PPP in vim
    await openInEditor(todaysFilepath);

    // read today's PPP
    const content = await getTodaysPPP(config.dirpath, type);

    // if today's PPP is empty, or nothing changed from the template, delete
    // today's PPP and exit program.
    if (!content || content === template) {
      debug('Did not find new content for today\'s PPP.');
      await deleteFile(todaysFilepath);
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
