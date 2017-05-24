# vscode-command-debug

> Note: this extension is a quick and dirty utility to help debug while developing extensions.

vscode extension to help understand what commands are available in the current runtime.

## How?

We contribute the following:

```
"commands": [
    {
        "command": "commandDebug.enumerate",
        "title": "Print all commands"
    },
    {
        "command": "commandDebug.filterEnumerate",
        "title": "Print a subset of commands"
    }
]
```

Which output to the dev tools console. Run them, and look at the output.

## License

MIT