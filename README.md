<div align=center>
  <h1>PPP CLI</h1>
  <h6>A cli tool to help generating PPP files (Progress, Plans & Problems) and sending them to Slack<h6>
</div>

Read more about PPP files here: https://weekdone.com/resources/plans-progress-problems

This cli tool can help you:
- Create daily PPPs
    - Each PPP is saved as: `YYYY-MM-DD`
    - When generating a new PPP, the previous PPP is used as a template
- Create weekly PPPs
    - Each weekly PPP is saved as: `weekly_YYYY-MM-DD_YYYY-MM-DD`
    - When generating a new weekly PPP, all PPPs for the last week are merged into a template
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

## Usage
```
ppp [options]
```
Your default editor (`$EDITOR`) will open for you to edit your PPP.

After saving & closing the editor, the PPP will be posted to the Slack channel
you configured.

Options:
- `-w, --weekly`
    Generate a weekly PPP (by default a daily PPP is generated).
- `-F <filename>`
    Specifies an alternative configuration file.
