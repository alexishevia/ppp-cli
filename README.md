<div align=center>
  <h1>PPP CLI</h1>
  <h6>A cli tool to help generate PPP files (Progress, Plans & Problems) and send them to Slack<h6>
</div>

This cli tool can help you:
- Create daily PPPs
    - Each PPP is saved as: `YYYY-MM-DD`
    - When generating a new PPP, the previous PPP is used as a template
- Create weekly PPPs
    - Each weekly PPP is saved as: `weekly_YYYY-MM-DD_YYYY-MM-DD`
    - When generating a new weekly PPP, all PPPs for the last week are merged into a template
- Automatically post your PPP to a slack channel

## Why
[PPP](https://weekdone.com/resources/plans-progress-problems) is a great tool for boosting your productivity AND is a perfect fit for [Slack daily updates](https://medium.com/commit-push/slack-tip-for-developers-this-is-what-your-daily-updates-should-look-like-e7440f675c2d).

## Installation

```shell
npm install ppp-cli --global
```

You'll need Node 8+.

## Configuration
Create a config file in `~/.pprc.json` with the following values:
- dirpath: absolute path to the directory where PPPs are stored
- token: slack legacy token (https://api.slack.com/custom-integrations/legacy-tokens)
- channel: id of the slack channel where PPP will be posted ([how to get the channel id](https://stackoverflow.com/a/44883343/4414505))
- user: id of the slack user to post as

Example:
```
{
  "dirpath": "/path/to/PPP/directory",
  "token": "xoxp-12345",
  "channel": "C3N9KTFU5",
  "user": "alexishevia"
}
```

## Usage
```shell
npx ppp-cli [options]
```
Your default editor (`$EDITOR`) will open for you to edit your PPP.

After saving & closing the editor, the PPP will be posted to the Slack channel
you configured.

Options:
- `-w, --weekly`
    Generate a weekly PPP (by default a daily PPP is generated).
- `-F <filename>`
    Specifies an alternative configuration file. Default is `~/.pprc.json`