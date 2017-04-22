$(document).ready(() => {
	let waitingToLoad = false; // For safety
	$(document).on('load-recording', (e, filename) => {
		IPC.send('load-recording-file', filename);
		waitingToLoad = true;
	});

	IPC.on('recording-file-loaded', (e, data) => {
		if (!waitingToLoad) return;

		$(document).trigger('recording-loaded', { filedata: data });
		waitingToLoad = false;
	});
});
