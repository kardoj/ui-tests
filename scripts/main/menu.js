const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');

const template = [
	{
		label: 'Fail',
		submenu: [
			{
				label: 'Akna suurus',
				submenu: [
					{
						label: '720 x 405',
						click(item, activeWindow) { setWindowSize(activeWindow, 720, 405); }
					},
					{
						label: '1024 x 576',
						click(item, activeWindow) { setWindowSize(activeWindow, 1024, 576); }
					},
					{
						label: '1280 x 720',
						click(item, activeWindow) { setWindowSize(activeWindow, 1280, 720); }
					},
					{
						label: '1600 x 900',
						click(item, activeWindow) { setWindowSize(activeWindow, 1600, 900); }
					}
				]
			},
			{
				label: 'Konsool',
				role: 'toggledevtools'
			},
			{
				label: 'Välju',
				role: 'close'
			}
		]
	}
];

function setWindowSize(win, width, height) {
	// Set actual window size
	win.setSize(width, height);

	// Trigger mainView resize
	win.webContents.send('mainview-resize');
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
