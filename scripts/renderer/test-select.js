$(document).ready(() => {
	let testSelect = $('#test_select');
	let waitingForFiles = false; // Safety
	let selected = null;

	readTestDirectory();
	// When 'Esita' is clicked, load the selected file into a Recording
	// Create a playback and play the recording

	$(document).on('recording-saved recording-deleted', (e, recordingName) => {
		if (recordingName !== undefined) selected = recordingName;
		readTestDirectory();
	});

	function readTestDirectory() {
		if (waitingForFiles) return;

		IPC.send('get-test-file-list');
		waitingForFiles = true;
	}

	IPC.on('got-test-file-list', (e, files) => {
		populateSelect(files, selected);
		waitingForFiles = false;
	});

	function populateSelect(files) {
		testSelect.val('');
		testSelect.empty();

		for (let i = 0; i < files.length; i++) {
			let option = `<option value='${files[i]}'>${files[i]}</option>`;
			testSelect.append(option);
		}

		// If selected is provided, select it and null it again
		if (selected !== null) {
			testSelect.val(selected);
			selected = null;
		}
	}
});
