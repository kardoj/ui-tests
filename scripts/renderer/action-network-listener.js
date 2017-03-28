// A little layer between the main webview (testSite) and the recorder or player.
// The performer performs an action and signals to this thing that it did that.
// Then this thing starts to listen to the network activity. If it identifies
// network activity in a predefined timeframe, it waits for the activity to complete
// and signals back to the performer that the loading is done and the next action can be performed.
$(document).ready(() => {
	let waitingForLoadingAfterAction = false;
	let isLoadingAfterAction = false;

	let testSite = $('#test_site');

	$(document).on('performed-an-action', () => {
		waitingForLoadingAfterAction = true;

		// Cancel waiting after set time if loading has not started
		setTimeout(() => {
			if (isLoadingAfterAction) return;

			waitingForLoadingAfterAction = false;
		}, Config.actionLoadingTimeout);
	});

	// Listener for the navigation actions. After an action has been recorded, this checks
	// whether the page started loading as a result. If it did, it waits for the loading to complete
	// and adds an URL check action
	testSite.get(0).addEventListener('did-start-loading', () => {
		if (!Recorder.isRecording()) return;
		if (!waitingForLoadingAfterAction) return;

		waitingForLoadingAfterAction = false;
		isLoadingAfterAction = true;
	});

	// If the recording was waiting for the loading to finish and the loading finished,
	// add a navigation check event
	testSite.get(0).addEventListener('did-stop-loading', () => {
		if (!Recorder.isRecording()) return;
		if (!isLoadingAfterAction) return;

		$(document).trigger('finished-loading-after-performing-an-action');
		isLoadingAfterAction = false;
	});
});
