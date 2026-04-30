# Foundry Link Install

Foundry can install this module from a public `module.json` manifest URL.

## GitHub Releases URL format

```text
https://github.com/polinavd/fatex-avatar-elements-ui/releases/latest/download/module.json
```

That is the URL to paste into:

```text
Foundry Setup -> Add-on Modules -> Install Module -> Manifest URL
```

## Release assets

Each release should include these files:

```text
module.json
fatex-avatar-elements-ui.zip
```

The `download` field inside `module.json` points Foundry to:

```text
https://github.com/polinavd/fatex-avatar-elements-ui/releases/latest/download/fatex-avatar-elements-ui.zip
```
