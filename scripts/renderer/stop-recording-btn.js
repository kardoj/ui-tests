$(document).ready(() => {
    let startRecordingBtn = $('#start_recording_btn');
	let stopRecordingBtn = $('#stop_recording_btn');

	stopRecordingBtn.on('click', () => {
        stopRecordingBtn.attr('disabled', 'disabled');
		stopRecordingBtn.trigger('stop-recording');
	});

	startRecordingBtn.on('start-recording', () => {
		stopRecordingBtn.removeAttr('disabled');
	});
});