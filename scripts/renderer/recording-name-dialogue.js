$(document).ready(() => {
	let dialogue = $('#recording_name_dialogue');
	let recordingNameBtn = dialogue.find('#recording_name_btn');
	let recordingNameInput = dialogue.find('#recording_name_input');
	let backlayer = $('#backlayer');

	$(document).on('ask-recording-name', (e, recording) => {
		// Center the dialogue before showing. Every time. Just in case.
		UiHelper.centerElement(dialogue);
		backlayer.show();
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
		backlayer.hide();
		dialogue.trigger('recording-name-set', recordingNameInput.val());
	}
});
