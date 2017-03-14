$(document).ready(() => {
	$(document).on('save-recording', (e, data) => {
		FS.writeFile('tests/test.uitest', data, (err) => {
			if (err) throw err;
			console.log('Saved!');
		});
	});
});
