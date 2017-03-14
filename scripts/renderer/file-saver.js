$(document).ready(() => {
	$(document).on('save-recording', (e, recordingInfo) => {
		let location = Config.testLocation + '/' + recordingInfo.name + '.' + Config.testFileSuffix;
		FS.writeFile(location, recordingInfo.data, (err) => {
			if (err) throw err;
			console.log('Saved!');
			$(document).trigger('recording-saved');
		});
	});
});
