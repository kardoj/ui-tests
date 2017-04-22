$(document).ready(() => {
	let waitingForSave = false; // Extra safety

	$(document).on('save-recording', (e, recordingInfo) => {
		IPC.send('save-recording-file', [recordingInfo.name, recordingInfo.data]);
		waitingForSave = true;
	});

	IPC.on('recording-file-saved', (e, filename) => {
		if (!waitingForSave) return;
		$(document).trigger('recording-saved', filename);
		waitingForSave = false;
	});
});
