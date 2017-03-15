$(document).ready(() => {
	$(document).on('save-recording', (e, recordingInfo) => {
		let filenameWithExtension = recordingInfo.name + Config.testFileExtension;
		let location = PATH.join(Config.testLocation, filenameWithExtension);
		FS.writeFile(location, recordingInfo.data, (err) => {
			if (err) throw err;

			$(document).trigger('recording-saved', filenameWithExtension);
		});
	});
});
