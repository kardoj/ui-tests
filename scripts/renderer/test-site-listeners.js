// All the event listeners that are injected into the quest page
const { ipcRenderer } = require('electron');

window.onload = () => {
	// Send click events and coordinates to the <webview> element
	document.addEventListener('click', (e) => {
		ipcRenderer.sendToHost('click-event', { x: e.clientX, y: e.clientY });
	});

	// Receive clicks from the parent page
	ipcRenderer.on('click-playback', (e, coords) => {
		console.log(document.elementFromPoint(coords.x, coords.y));
		document.elementFromPoint(coords.x, coords.y).click();
	});
};
