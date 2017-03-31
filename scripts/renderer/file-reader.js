$(document).ready(() => {
	$(document).on('load-recording', (e, filepath) => {
		FS.readFile(filepath, (err, data) => {
			if (err) throw err;

			$(document).trigger('recording-loaded', { filedata: data });
		});
	});
});
