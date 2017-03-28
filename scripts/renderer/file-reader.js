$(document).ready(() => {
	$(document).on('read-recording', (e, filepath) => {
		FS.readFile(filepath, (err, data) => {
			if (err) throw err;

			$(document).trigger('recording-loaded', { filedata: data });
		});
	});
});
