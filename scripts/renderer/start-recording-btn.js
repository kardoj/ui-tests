$(document).ready(() => {
	let startRecordingBtn = $('#start_recording_btn');
	let stopRecordingBtn = $('#stop_recording_btn');
	let testFileMenu = $('#test_file_menu');

	startRecordingBtn.on('click', () => {
		startRecordingBtn.attr('disabled', 'disabled');
		testFileMenu.find(':input').attr('disabled', 'disabled');
		startRecordingBtn.trigger('start-recording');
	});

	stopRecordingBtn.on('stop-recording', () => {
		startRecordingBtn.removeAttr('disabled');
	});
});
