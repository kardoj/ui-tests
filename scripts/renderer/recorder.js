let Recorder = {};
((ns, $) => {
	let isRecording = false;
	let recording = null;
	let startTime = null;

	let addAssertionBtn = null;
	let askRecordingNameDialogue = null;
	let startRecordingBtn = null;
	let stopRecordingBtn = null;
	let testSite = null;

	// Asking isRecording from outside
	ns.isRecording = function() { return isRecording; };

	// All the private stuff
	$(document).ready(() => {
		addAssertionBtn = $('#add_assertion_btn');
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
			// Also add an UrlCheck action to be sure
			recording.addAction(new NavAction(testSite.get(0).getURL()));
			recording.addAction(new UrlCheck(testSite.get(0).getURL()));
			testSite.get(0).openDevTools();
		});

		addAssertionBtn.on('add-assertion', () => { testSite.get(0).send('add-check-state'); });

		// testSite's preloaded script test-site-listeners.js has the listeners for these events.
		// When interacting with the testSite, it captures the events and sends them
		// here for the recording to save them or work with them
		testSite.get(0).addEventListener('ipc-message', (e) => {
			if (!isRecording) return;
			let actionData = e.args[0];

			if (e.channel == 'scroll-event') {
				recording.addAction(new ScrollAction(actionData.x, actionData.y));
				$(document).trigger('performed-an-action');
			} else if (e.channel == 'click-event') {
				recording.addAction(new ClickAction(actionData.x, actionData.y, actionData.tagName));
				$(document).trigger('performed-an-action');
			} else if (e.channel == 'input-event') {
				recording.addAction(new InputAction(actionData.x, actionData.y, actionData.input));
				$(document).trigger('performed-an-action');
			} else if (e.channel == 'nav-event') {
				recording.addAction(new NavAction(actionData.url));
				$(document).trigger('performed-an-action');
			} else if (e.channel == 'choose-el-check') {
				$(document).trigger('choose-el-check-attributes', { x: 0, y: 0, content: actionData.attributes });
			}
		});

		// When an action initialized loading (link to another page),
		// UrlCheck action will be added after the loading has finished
		$(document).on('finished-loading-after-action', () => {
			if (!isRecording) return;
			recording.addAction(new UrlCheck(testSite.get(0).getURL()));
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
