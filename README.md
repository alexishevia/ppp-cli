<div align=center>
  <h1>PPP CLI</h1>
  <h6>A cli tool to help generating PPP files (Progress, Plans & Problems) and sending them to Slack<h6>
</div>

## Installation

```shell
npm install ppp-cli --global
```

You need to have installed Node 8+.

## Usage
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

Then, run `ppp`. Your default editor (as configured in the $EDITOR env
variable) will open for you to write your PPP.

After closing the editor, the PPP will be posted to the Slack channel you
configured.
