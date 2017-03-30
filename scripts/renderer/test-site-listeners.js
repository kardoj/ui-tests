// All the event listeners that are injected into the quest page
const { ipcRenderer } = require('electron');

window.onload = () => {
	// Send click events and coordinates to the <webview> element
	document.addEventListener('click', (e) => {
		let el = document.elementFromPoint(e.clientX, e.clientY);
		ipcRenderer.sendToHost('click-event', { x: e.clientX, y: e.clientY, tagName: el.tagName });
	});

	ipcRenderer.on('click-playback', (e, actionData) => {
		let el = document.elementFromPoint(actionData.x, actionData.y);
		let expectedTag = actionData.tagName;
		let actualTag = el.tagName;
		let info = ', actual: ' + actualTag + ', expected: ' + expectedTag;

		if (actualTag == expectedTag) {
			document.elementFromPoint(coords.x, coords.y).click();
			ipcRenderer.sendToHost('action-playback-success', { message: 'Peformed click action successfully' + info });
		} else {
			ipcRenderer.sendToHost('action-playback-failure', { message: 'Performed a failed click action' + info });
		}
	});

	ipcRenderer.on('url-check', (e, actionData) => {
		let currentURL = window.location.href;
		let expectedURL = actionData.url;
		let info = ', actual: ' + currentURL + ', expected: ' + expectedURL;

		if (currentURL == expectedURL) {
			ipcRenderer.sendToHost('action-playback-success', { message: 'Peformed url check successfully' + info });
		} else {
			ipcRenderer.sendToHost('action-playback-failure', { message: 'Performed a failed url check' + info });
		}
	});

	ipcRenderer.on('nav-action', (e, actionData) => {
		window.location.href = actionData.url;
		ipcRenderer.sendToHost('action-playback-success', { message: 'Peformed nav action successfully: ' + actionData.url });
	});
};
