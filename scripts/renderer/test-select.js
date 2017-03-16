$(document).ready(() => {
	let testSelect = $('#test_select');

	readTestDirectory();
	// When 'Esita' is clicked, load the selected file into a Recording
	// Create a playback and play the recording

	$(document).on('recording-saved recording-deleted', (e, recordingName) => {
		readTestDirectory(recordingName);
	});

	function readTestDirectory(selected) {
		FS.readdir(Config.testLocation, (err, files) => {
			if (err) throw err;

			populateSelect(files, selected);
		});
	}

	function populateSelect(files, selected = null) {
		testSelect.val('');
		testSelect.empty();

		for (let i = 0; i < files.length; i++) {
			let value = files[i];
			let text  = PATH.basename(files[i], Config.testFileExtension);
			let option = `<option value='${value}'>${text}</option>`;
			testSelect.append(option);
		}

		// If selected is provided, select it
		if (selected !== null) testSelect.val(selected);
	}
});
