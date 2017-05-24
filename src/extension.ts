'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "command-debug" is now active!');

    // since we can only toggle this, we toggle it once per workspace and make the assumption that
    // the user will either keep it open or know how to open it on their own
    context.workspaceState.update('toggledDevTools', false);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let commands = [
        vscode.commands.registerCommand('extension.enumerate', () => {
            vscode.commands.getCommands()
                .then((commands) => { console.log("All commands: ", commands) })
                .then(() => {
                    if (context.workspaceState.get('toggledDevTools') === false) {
                        vscode.commands.executeCommand('workbench.action.toggleDevTools');
                        context.workspaceState.update('toggledDevTools', true);
                    }
                });
        }),
        vscode.commands.registerCommand('extension.filterEnumerate', () => {
            vscode.window.showInputBox({
                prompt: 'Enter Filter Regex'
            })
            .then((regex) => {
                return vscode.commands.getCommands().then((commands) => {
                    return commands.filter((command) => {
                        return new RegExp(regex).test(command);
                    });
                })
            })
            .then((commands) => { console.log("Matched commands: ", commands) })
            .then(() => {
                if (context.workspaceState.get('toggledDevTools') === false) {
                    vscode.commands.executeCommand('workbench.action.toggleDevTools');
                    context.workspaceState.update('toggledDevTools', true);
                }
            });
        })
    ];

    context.subscriptions.push(...commands);
}

// this method is called when your extension is deactivated
export function deactivate() {
}