const ipc = require('electron').ipcRenderer;

ipc.on('open-address-input', () => {
	console.log('luls');
});
