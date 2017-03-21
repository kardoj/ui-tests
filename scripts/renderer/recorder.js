let Recorder = {};
((ns, $) => {
	let isRecording = false;
	let recording = null;
	let startTime = null;
	let waitingForLoadingAfterAction = false;
	let isLoadingAfterAction = false;

	let askRecordingNameDialogue = null;
	let startRecordingBtn = null;
	let stopRecordingBtn = null;
	let testSite = null;

	// Public methods
	ns.isRecording = function() {
		return isRecording;
	};

	// All the private stuff
	$(document).ready(() => {
		askRecordingNameDialogue = $('#recording_name_dialogue');
		startRecordingBtn = $('#start_recording_btn');
		stopRecordingBtn = $('#stop_recording_btn');
		testSite = $('#test_site');

		// Listens for the recording to start
		startRecordingBtn.on('start-recording', () => {
			isRecording = true;
			startTime = Utility.timestamp();

			// When the recording starts, a new recording is created
			recording = new Recording();

			// The first action in a recording must be a navigation to the test start page
			recording.addAction(new NavAction(testSite.get(0).getURL()));
		});

		// Handle events from the test site
		testSite.get(0).addEventListener('ipc-message', (e) => {
			if (!isRecording) return;
			let coords = e.args[0];

			if (e.channel == 'click-event') {
				recording.addAction(new ClickAction(coords.x, coords.y));
				waitingForLoadingAfterAction = true;
				console.log('waiting for loading');

				setTimeout(() => {
					if (isLoadingAfterAction) return;

					console.log('did not start loading');
					waitingForLoadingAfterAction = false;
				}, Config.actionRecordingLoadingTimeout);
			}
		});

		// Listener for the navigation actions. After an action has been recorded, this checks
		// whether the page started loading as a result. If it did, it waits for the loading to complete
		// and adds an URL check action
		testSite.get(0).addEventListener('did-start-loading', () => {
			if (!isRecording) return;
			if (!waitingForLoadingAfterAction) return;

			waitingForLoadingAfterAction = false;
			isLoadingAfterAction = true;
			console.log('started loading indeed');
		});

		// If the recording was waiting for the loading to finish and the loading finished,
		// add a navigation check event
		testSite.get(0).addEventListener('did-stop-loading', () => {
			if (!isRecording) return;
			if (!isLoadingAfterAction) return;

			recording.addAction(new UrlCheck(testSite.get(0).getURL()));
			console.log('finished loading');
			isLoadingAfterAction = false;
		});

		stopRecordingBtn.on('stop-recording', () => {
			// Only try to save if there are any actions in the recording
			if (recording.hasActions) {
				// Prompt for a name
				$(document).trigger('ask-recording-name');
			}
		});

		askRecordingNameDialogue.on('recording-name-set', (e, name) => {
			// Append the timestamp to the name
			recording.name = name + '-' + startTime;

			// Save the file
			$(document).trigger('save-recording', { name: recording.name, data: recording.toJSON() });
		});

		// Once the get-name-and-save flow has been completed, prepare for the next recording
		$(document).on('recording-saved', () => {
			recording = null;
			isRecording = false;
			startTime = null;
		});
	});
})(Recorder, $);
