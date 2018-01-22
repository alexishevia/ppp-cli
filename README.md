<div align=center>
  <h1>PPP CLI</h1>
  <h6>A cli tool to help generating PPP files (Progress, Plans & Problems) and sending them to Slack<h6>
</div>

Read more about PPP files here: https://weekdone.com/resources/plans-progress-problems

This cli tool can help you:
- Create daily PPPs, where each PPP uses the previous PPP as template, and is saved as a file with name: `YYYY-MM-DD`
- Automatically post your PPP to a slack channel

## Installation

```shell
npm install ppp-cli --global
```

You'll need Node 8+.

## Configuration
Create a config file in `~/.pprc.json` with the following values:
- dirpath: absolute path to the directory where PPPs are stored
- token: slack legacy token (https://api.slack.com/custom-integrations/legacy-tokens)
- channel: id of slack channel where PPP will be posted
- user: id of slack user to post as

Example:
```
{
  "dirpath": "/path/to/PPP/directory",
  "token": "xoxp-12345",
  "channel": "C3N9KTFU5",
  "user": "alexishevia"
}
```

Note: you can specify a different config file using the `PPP_CONFIG_FILE`
environment variable.

## Usage
Run:
```
ppp
```
Your default editor (`$EDITOR`) will open for you to edit your PPP for the day.

After saving & closing the editor, the PPP will be posted to the Slack channel
you configured.
