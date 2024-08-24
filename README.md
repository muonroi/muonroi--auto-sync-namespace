# muonroi--auto-sync-namespace

This Visual Studio Code extension automatically synchronizes the namespace in C# files based on the file's location within the project directory. It's designed to keep your namespaces consistent and properly structured according to your project's folder hierarchy.

## Features

- **Automatic Namespace Synchronization**: Automatically updates the namespace of C# files when they are saved, ensuring they match the folder structure of your project.
- **Manual Namespace Sync Command**: Use the command palette to manually sync the namespace of the active C# file.

> Tip: This extension is great for maintaining consistent namespaces across your C# project, especially in large codebases.

## Requirements

This extension requires:
- Visual Studio Code version 1.40.0 or higher.
- A C# project with `.cs` files structured in folders.
- C# configuration with a root namespace defined in your workspace settings (`csharp.rootNamespace`).

## Extension Settings

This extension contributes the following settings:

- `csharp.rootNamespace`: Specifies the root namespace for your C# project. The extension uses this setting as the base namespace and appends folder paths to create the full namespace for each file.

## Known Issues

- The extension currently only supports single root namespace configuration. Projects with multiple root namespaces or custom namespace rules might not work as expected.

## Release Notes

### 1.0.0

- Initial release of `muonroi--auto-sync-namespace`.
- Features automatic and manual namespace synchronization based on the file path.

## Following Extension Guidelines

Ensure that you've read through the extension guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For More Information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**