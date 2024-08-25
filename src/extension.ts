import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.syncNamespace', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			syncNamespace(editor.document);
		}
	});

	vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
		if (document.languageId === 'csharp') {
			syncNamespace(document);
		}
	});

	context.subscriptions.push(disposable);
}


function syncNamespace(document: vscode.TextDocument) {
	const editor = vscode.window.activeTextEditor;
	if (!editor || editor.document !== document) {
		return;
	}

	const fileName = path.basename(document.fileName);

	if (fileName === 'Program.cs' || fileName === 'Startup.cs') {
		console.log(`Skipping namespace sync for ${fileName}`);
		return;
	}

	console.log("syncNamespace function triggered");

	const filePath = document.fileName;
	const fileDir = path.dirname(filePath);
	const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? '';

	console.log("Workspace Folder:", workspaceFolder);
	console.log("File Directory:", fileDir);

	const relativePath = path.relative(workspaceFolder, fileDir);
	const rootNamespace = vscode.workspace.getConfiguration('csharp').get<string>('rootNamespace') ?? 'API';

	let namespacePath = path.join(rootNamespace, relativePath).replace(/[\\/]/g, '.');
	if (namespacePath.startsWith(`${rootNamespace}.${rootNamespace}`)) {
		namespacePath = namespacePath.replace(`${rootNamespace}.`, '');
	}

	console.log("Computed Namespace:", namespacePath);

	let fileContent = document.getText();
	const namespaceBlockRegex = /namespace\s+([\w.]+)\s*\{([\s\S]*)\}/;
	const namespaceSingleLineRegex = /namespace\s+([\w.]+);/;

	if (namespaceBlockRegex.test(fileContent)) {
		fileContent = fileContent.replace(namespaceBlockRegex, `namespace ${namespacePath};$2`);
		console.log("Namespace block detected and converted to single-line format.");
	} else if (namespaceSingleLineRegex.test(fileContent)) {
		fileContent = fileContent.replace(namespaceSingleLineRegex, `namespace ${namespacePath};`);
		console.log("Single-line namespace detected and corrected.");
	} else if (fileContent.trim().length === 0) {
		fileContent = `namespace ${namespacePath};\n\n`;
		console.log("File is empty. Created new single-line namespace.");
	} else {
		const namespaceRegex = /namespace\s+[\w.]+/;
		if (namespaceRegex.test(fileContent)) {
			fileContent = fileContent.replace(namespaceRegex, `namespace ${namespacePath};`);
			console.log("Existing incorrect namespace replaced with correct single-line format.");
		} else {
			fileContent = `namespace ${namespacePath};\n\n` + fileContent;
			console.log("No namespace found. Added correct single-line namespace at the top.");
		}
	}

	const fullRange = new vscode.Range(
		document.positionAt(0),
		document.positionAt(document.getText().length)
	);
	const edit = new vscode.WorkspaceEdit();
	edit.replace(document.uri, fullRange, fileContent);
	vscode.workspace.applyEdit(edit);

	document.save();
	console.log("Namespace updated or created, and document saved");
}


export function deactivate() {
	// Optionally, save the document after updating the namespace
}
