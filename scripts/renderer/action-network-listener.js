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
		console.log('waiting for loading to start after action');

		// Cancel waiting after set time if loading has not started
		setTimeout(() => {
			if (isLoadingAfterAction) return;

			waitingForLoadingAfterAction = false;
			console.log('did not start loading after action');
		}, Config.actionLoadingTimeout);
	});

	// Listener for the navigation actions. After an action has been recorded, this checks
	// whether the page started loading as a result. If it did, it waits for the loading to complete
	// and adds an URL check action
	testSite.get(0).addEventListener('did-start-loading', () => {
		if (!Recorder.isRecording() && !Player.isPlaying()) return;
		if (!waitingForLoadingAfterAction) return;

		waitingForLoadingAfterAction = false;
		isLoadingAfterAction = true;
		console.log('started loading after action');
	});

	// If the recording was waiting for the loading to finish and the loading finished,
	// add a navigation check event
	testSite.get(0).addEventListener('did-stop-loading', () => {
		if (!Recorder.isRecording() && !Player.isPlaying()) return;
		if (!isLoadingAfterAction) return;

		$(document).trigger('finished-loading-after-performing-an-action');
		isLoadingAfterAction = false;
		console.log('finished loading after action');
	});
});
