$(document).ready(() => {
	let isRecording = false;
	let recording = null;
	let startTime = null;

	let startRecordingBtn = $('#start_recording_btn');
	let stopRecordingBtn = $('#stop_recording_btn');
	let testSite = $('#test_site');

	// Listens for the recording to start
	startRecordingBtn.on('start-recording', () => {
		isRecording = true;
		startTime = Utility.timestamp();

		// When the recording starts, starts a new recording object
		recording = new Recording(startTime);
		console.log(recording);
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
		$(document).trigger('save-recording', recording.toJSON());
		recording = null;
		isRecording = false;
		startTime = null;
	});

	// Must check the network activity from testSite after every event and when it has stopped must create
	// a new event to check the destination address

	// Listens for the recording to stop
	// When the recording stops, saves the new recording object into a file (JSON)
});
