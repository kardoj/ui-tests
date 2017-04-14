let Recorder = {};
((ns, $) => {
	// The recording can be in one of two different states:
	// STATE_RECORD - is listening to all the events that are not related to adding a new check
	// STATE_ADD_CHECK - is listening to only events which are related to adding a new check
	// The reasoning behind two different states is that the recording can not be allowed
	// to register the regular actions when adding a check (ClickAction for example, since it
	// is used to select an element rather than register a click on it).
	const STATE_RECORD = 'STATE_RECORD';
	const STATE_ADD_CHECK = 'STATE_ADD_CHECK';

	let isRecording = false;
	let recording = null;
	let startTime = null;

	let addAssertionBtn = null;
	let askRecordingNameDialogue = null;
	let startRecordingBtn = null;
	let stopRecordingBtn = null;
	let testSite = null;

	// State can be on record at all times, even if the test is not running
	let state = STATE_RECORD;

	// Used to keep track which actions to allow through in which state
	let allowedActions = {
		STATE_RECORD: ['click-event', 'input-event', 'nav-event', 'scroll-event'],
		STATE_ADD_CHECK: ['click-event', 'scroll-event']
	};

	// Convenience method for more clearly checking if an action is allowed to be recorded
	// channel is event name actually. Variable name channel is used to be consistent with ipc naming
	function channelIsAllowedForState(channel, state) { return allowedActions[state].indexOf(channel) >= 0; }

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

		// Setting the appropriate state so adding a new check can happen
		addAssertionBtn.on('add-assertion', () => { state = STATE_ADD_CHECK; });

		// testSite's preloaded script test-site-listeners.js has the listeners for these events.
		// When interacting with the testSite, it captures the events and sends them
		// here for the recording to save them or work with them
		testSite.get(0).addEventListener('ipc-message', (e) => {
			if (!isRecording) return;
			let actionData = e.args[0];

			if (e.channel == 'scroll-event' && channelIsAllowedForState(e.channel, state)) {
				recording.addAction(new ScrollAction(actionData.x, actionData.y));
				$(document).trigger('performed-an-action');
			} else if (e.channel == 'click-event' && channelIsAllowedForState(e.channel, state)) {
				if (state == STATE_RECORD) {
					recording.addAction(new ClickAction(actionData.x, actionData.y, actionData.element.tagName));
					testSite.get(0).send('click-forward', { x: actionData.x, y: actionData.y });
					$(document).trigger('performed-an-action');
				} else if (state == STATE_ADD_CHECK) {
					console.log(actionData.element);
				}
			} else if (e.channel == 'input-event' && channelIsAllowedForState(e.channel, state)) {
				recording.addAction(new InputAction(actionData.x, actionData.y, actionData.input));
				$(document).trigger('performed-an-action');
			} else if (e.channel == 'nav-event' && channelIsAllowedForState(e.channel, state)) {
				recording.addAction(new NavAction(actionData.url));
				$(document).trigger('performed-an-action');
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
