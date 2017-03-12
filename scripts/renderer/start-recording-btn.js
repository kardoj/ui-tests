$(document).ready(() => {
	let startRecordingBtn = $('#start_recording_btn');
	let stopRecordingBtn = $('#stop_recording_btn');

	startRecordingBtn.on('click', () => {
		startRecordingBtn.attr('disabled', 'disabled');
		startRecordingBtn.trigger('start-recording');
	});

	stopRecordingBtn.on('stop-recording', () => {
		startRecordingBtn.removeAttr('disabled');
	});
});