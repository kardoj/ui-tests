$(document).ready(() => {
	let dialogue = $('#recording-name-dialogue');
	let recordingNameBtn = dialogue.find('#recording_name_btn');
	let recordingNameInput = dialogue.find('#recording_name_input');

	$(document).on('ask-recording-name', (e, recording) => {
		dialogue.show();
		recordingNameInput.focus();
	});

	recordingNameBtn.on('click', () => {
		recordingNameSet();
	});

	recordingNameInput.on('keypress', (e) => {
		if (e.which === 13) recordingNameSet();
	});

	function recordingNameSet() {
		if (!recordingNameInput.val()) return;

		dialogue.hide();
		dialogue.trigger('recording-name-set', recordingNameInput.val());
	}
});
