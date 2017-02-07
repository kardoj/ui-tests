const Menu = require('electron').Menu;

const template = [
	{
		label: 'Tegevused',
		submenu: [
			{
				label: 'Navigeeri leheküljele',
				click(item, activeWindow) { activeWindow.webContents.send('open-address-input'); }
			},
			{
				label: 'Tagasi',
				role: 'back'
			},
			{
				label: 'Edasi',
				role: 'forward'
			}
		]
	}
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
