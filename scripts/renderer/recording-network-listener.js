// A little layer between the main webview (testSite) and the recorder.
// The recorder records an action and signals to this thing that it recorded an action.
// Then this thing starts to listen to the network activity. If it identifies
// Network activity in a predefined timeframe, it waits for the activity to complete
// and signals back to the recorder that the loading is done.
$(document).ready(() => {
	let waitingForLoadingAfterAction = false;
	let isLoadingAfterAction = false;

	let testSite = $('#test_site');

	$(document).on('recorded-an-action', () => {
		waitingForLoadingAfterAction = true;

		// Cancel waiting after set time if loading has not started
		setTimeout(() => {
			if (isLoadingAfterAction) return;

			waitingForLoadingAfterAction = false;
		}, Config.actionRecordingLoadingTimeout);
	});

	// Listener for the navigation actions. After an action has been recorded, this checks
	// whether the page started loading as a result. If it did, it waits for the loading to complete
	// and adds an URL check action
	testSite.get(0).addEventListener('did-start-loading', () => {
		if (!Recorder.isRecording()) return;
		if (!waitingForLoadingAfterAction) return;

		waitingForLoadingAfterAction = false;
		isLoadingAfterAction = true;
		console.log('started loading indeed');
	});

	// If the recording was waiting for the loading to finish and the loading finished,
	// add a navigation check event
	testSite.get(0).addEventListener('did-stop-loading', () => {
		if (!Recorder.isRecording()) return;
		if (!isLoadingAfterAction) return;

		$(document).trigger('finished-loading-after-recording-an-action');
		console.log('finished loading');
		isLoadingAfterAction = false;
	});
});
