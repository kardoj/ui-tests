const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');

const template = [
	{
		label: 'Tegevused',
		submenu: [
			{
				label: 'Navigeeri leheküljele',
				click(item, activeWindow) { navigateToURL(); }
			},
			{
				label: 'Tagasi',
				role: 'undo'
			},
			{
				label: 'Edasi',
				role: 'redo'
			}
		]
	}
];

navigateToURL = function(activeWindow) {
	let addressPrompt = new BrowserWindow({ width: 300, height: 200 });

	addressPrompt.loadURL(url.format({
		pathname: path.join(__dirname, '../../views/address-prompt.html'),
		protocol: 'file:',
		slashes: true
	}));

	addressPrompt.on('closed', () => { addressPrompt = null; });

	app.setAddressPrompt(addressPrompt);
};

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
