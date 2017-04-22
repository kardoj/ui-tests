const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
require(path.join(__dirname, 'menu'));

const testFolder = 'ui-tests-tests';
const testFileExtension = '.uitest';
// If test folder is not created yet, create it
const testPath = path.join(app.getPath('appData'), testFolder);
if (!fs.existsSync(testPath)) fs.mkdirSync(testPath);


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		resizable: false,
		fullscreenable: false,
		show: false
	});

	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '../../views/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Emitted when the window is closed.
	mainWindow.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
}

ipcMain.on('delete-recording-file', (e, filename) => {
	let fileWithExtension = filename + testFileExtension;
	fs.unlink(path.join(testPath, fileWithExtension), (err) => {
		if (err) throw err;
		e.sender.send('recording-file-deleted');
	});
});

ipcMain.on('get-test-file-list', (e) => {
	fs.readdir(testPath, (err, files) => {
		if (err) throw err;
		let filesWithoutExtension = files.map((f) => {
			return path.basename(f, testFileExtension);
		});
		e.sender.send('got-test-file-list', filesWithoutExtension);
	});
});

ipcMain.on('save-recording-file', (e, recordingData) => {
	let fileWithExtension = recordingData[0] + testFileExtension;
	fs.writeFile(path.join(testPath, fileWithExtension), recordingData[1], (err) => {
		if (err) throw err;
		e.sender.send('recording-file-saved', recordingData[0]);
	});
});

ipcMain.on('load-recording-file', (e, filename) => {
	let fileWithExtension = filename + testFileExtension;
	fs.readFile(path.join(testPath, fileWithExtension), (err, data) => {
		if (err) throw err;
		e.sender.send('recording-file-loaded', data);
	});
});

ipcMain.on('resize-window', (e, dimensions) => {
	app.setWindowSize(dimensions[0], dimensions[1]);
});

app.setWindowSize = function(width, height) {
	// Set actual window size
	mainWindow.setSize(width, height);

	// Trigger testSite resize
	mainWindow.webContents.send('test-site-resize', { width: width, height: height });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	initialize();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		initialize();
	}
});

function initialize() {
	createWindow();
	mainWindow.once('ready-to-show', () => {
		let size = mainWindow.getSize();
		mainWindow.webContents.send('test-site-resize', { width: size[0], height: size[1] });
		mainWindow.show();
	});
}
