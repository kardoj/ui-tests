$(document).ready(() => {
	let addAssertionBtn = $('#add_assertion_btn');
    let startRecordingBtn = $('#start_recording_btn');
	let stopRecordingBtn = $('#stop_recording_btn');
	let testFileMenu = $('#test_file_menu');


	stopRecordingBtn.on('click', () => {
        stopRecordingBtn.attr('disabled', 'disabled');
        addAssertionBtn.attr('disabled', 'disabled');
		testFileMenu.find(':input').removeAttr('disabled');
		stopRecordingBtn.trigger('stop-recording');
	});

	startRecordingBtn.on('start-recording', () => {
		stopRecordingBtn.removeAttr('disabled');
	});
});
