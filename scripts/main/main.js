const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

require(path.join(__dirname, 'menu'));

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
