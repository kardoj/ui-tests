$(document).ready(() => {
	let testSite = $('#test_site');
	let loadingDialogue = $('#loading_dialogue');
	let backlayer = $('#backlayer');

	testSite.get(0).addEventListener('did-start-loading', () => {
		if (!Recorder.isRecording()) return;

		UiHelper.centerElement(loadingDialogue);
		loadingDialogue.show();
		backlayer.show();
	});

	testSite.get(0).addEventListener('did-stop-loading', () => {
		if (!Recorder.isRecording()) return;

		loadingDialogue.hide();
		backlayer.hide();
	});
});
