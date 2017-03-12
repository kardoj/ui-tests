// All the event listeners that are injected into the quest page
const { ipcRenderer } = require('electron');

window.onload = () => {
	// Send click events and coordinates to the <webview> element
	document.addEventListener('click', (e) => {
		ipcRenderer.sendToHost('click-event', { coords: { x: e.clientX, y: e.clientY } });
	});

	// Receive clicks from the parent page
	ipcRenderer.on('click-playback', (e, coords) => {
		console.log(coords);
	});
};