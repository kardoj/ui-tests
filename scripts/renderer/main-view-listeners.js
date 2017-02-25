// All the event listeners that are injected into the quest page
const { ipcRenderer } = require('electron').ipcRenderer;

window.onload = () => {
	// Clicking on an element
	document.addEventListener('click', (e) => {
		ipcRenderer.sendToHost('click-event');        
	});
};