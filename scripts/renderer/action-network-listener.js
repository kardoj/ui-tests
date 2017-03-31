// A little layer between the main webview (testSite) and the recorder or player.
// The performer performs an action and signals to this thing that it did that.
// Then this thing starts to listen to the network activity. If it identifies
// network activity in a predefined timeframe, it waits for the activity to complete
// and signals back to the performer that the loading is done and the next action can be performed.
$(document).ready(() => {
	let isLoadingAfterAction = false;
	let waitingForLoadingTimeout = null;

	let testSite = $('#test_site');

	$(document).on('performed-an-action', () => {
		console.log('waiting for loading to start after action');

		// Cancel waiting after set time if loading has not started
		waitingForLoadingTimeout = setTimeout(() => {
			$(document).trigger('did-not-start-loading-after-action');
			console.log('did not start loading after action');
		}, Config.actionLoadingTimeout);
	});

	// If the page started loading while waitingForLoadingTimeout was ticking
	testSite.get(0).addEventListener('did-start-loading', () => {
		if (!Recorder.isRecording() && !Player.isPlaying()) return;
		if (waitingForLoadingTimeout === null) return;

		// Clear loading timeout so it won't fire later anyway
		clearTimeout(waitingForLoadingTimeout);
		waitingForLoadingTimeout = null;

		isLoadingAfterAction = true;
		console.log('started loading after action');
	});

	// If the recording was waiting for the loading to finish and the loading finished,
	// add a navigation check event
	testSite.get(0).addEventListener('did-stop-loading', () => {
		if (!Recorder.isRecording() && !Player.isPlaying()) return;
		if (!isLoadingAfterAction) return;

		console.log('finished loading after action');
		$(document).trigger('finished-loading-after-action');
		isLoadingAfterAction = false;
	});
});
