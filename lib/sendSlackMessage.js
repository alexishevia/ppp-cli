const request = require('superagent');

/**
 * sendSlackMessage()
 * Will send a text message to a Slack channel.
 *
 * @param {String} text - text message to send
 * @param {String} token - slack legacy token (https://api.slack.com/custom-integrations/legacy-tokens)
 * @param {String} channel - id of slack channel where PPP will be posted
 * @param {String} user - id of slack user to post as
 * @returns {Promise} - resolves when the message is sent or is rejected with
 *                      an error.
 */
const sendSlackMessage = (text, token, channel, user) => (
  request
  .post('https://slack.com/api/chat.postMessage')
  .set('Authorization', `Bearer ${token}`)
  .set('Content-Type', 'application/json; charset=utf-8')
  .set('Accept', 'application/json')
  .send({ text, channel, as_user: user })
  .then(response => (response && response.body) || {})
  .then((body) => {
    if (!body.ok) {
      throw new Error(body.error || JSON.stringify(body));
    }
  })
  .catch((err) => {
    throw new Error(`Failed sending message to slack: ${err}`);
  })
);

module.exports = sendSlackMessage;
