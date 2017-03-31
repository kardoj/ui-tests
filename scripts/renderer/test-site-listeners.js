// All the event listeners that are injected into the quest page
const { ipcRenderer } = require('electron');

window.onload = () => {
	// Send click events and coordinates to the <webview> element
	document.addEventListener('click', (e) => {
		let el = document.elementFromPoint(e.clientX, e.clientY);
		ipcRenderer.sendToHost('click-event', { x: e.clientX, y: e.clientY, tagName: el.tagName });
	});

	ipcRenderer.on('click-playback', (e, actionData) => {
		console.log('click-playback indeed');
		let el = document.elementFromPoint(actionData.x, actionData.y);
		let expectedTag = actionData.tagName;
		let actualTag = el.tagName;
		let info = ', expected: ' + expectedTag + ', actual: ' + actualTag;

		if (actualTag == expectedTag) {
			ipcRenderer.sendToHost('action-playback-success', { message: 'Peformed click action successfully' + info });
			el.click();
		} else {
			ipcRenderer.sendToHost('action-playback-failure', { message: 'Performed a failed click action' + info });
		}
	});

	ipcRenderer.on('url-check', (e, actionData) => {
		let currentURL = window.location.href;
		let expectedURL = actionData.url;
		let info = ', expected: ' + expectedURL + ', actual: ' + currentURL;

		if (currentURL == expectedURL) {
			ipcRenderer.sendToHost('action-playback-success', { message: 'Peformed url check successfully' + info });
		} else {
			ipcRenderer.sendToHost('action-playback-failure', { message: 'Performed a failed url check' + info });
		}
	});

	ipcRenderer.on('nav-action', (e, actionData) => {
		console.log('nav-action indeed');

		ipcRenderer.sendToHost('action-playback-success', { message: 'Peformed nav action successfully: ' + actionData.url });
		window.location = actionData.url;
	});
};
