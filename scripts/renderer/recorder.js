$(document).ready(() => {
	let isRecording = false;
	let recording = null;
	let startTime = null;

	let askRecordingNameDialogue = $('#recording_name_dialogue');
	let startRecordingBtn = $('#start_recording_btn');
	let stopRecordingBtn = $('#stop_recording_btn');
	let testSite = $('#test_site');

	// Listens for the recording to start
	startRecordingBtn.on('start-recording', () => {
		isRecording = true;
		startTime = Utility.timestamp();

		// When the recording starts, starts a new recording object
		recording = new Recording(startTime);
		// The first action in a recording must be a navigation to the start page
	});

	// Handle events from the test site
	testSite.get(0).addEventListener('ipc-message', (e) => {
		let coords = e.args[0];
		if (isRecording) {
			if (e.channel == 'click-event') {
				recording.addAction(new Action(coords.x, coords.y, Utility.timestamp()));
			}
		}
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

	// Must check the network activity from testSite after every event and when it has stopped must create
	// a new event to check the destination address

	// Listens for the recording to stop
	// When the recording stops, saves the new recording object into a file (JSON)
});
