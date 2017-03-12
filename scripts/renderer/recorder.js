$(document).ready(() => {
	let recordingHasStarted = false;
	let recording = null;
	let startTime = null;

	let startRecordingBtn = $('#start_recording_btn');
	let testSite = $('#test_site');

	// Listens for the recording to start
	startRecordingBtn.on('start-recording', () => {
		recordingHasStarted = true;
		startTime = Utility.timestamp();

		// When the recording starts, starts a new recording object
		recording = new Recording(startTime);
		console.log(recording);
		
		// When the recording has started, listens to events from testSite
	});

	// TODO: Why is this not working?
	testSite.get(0).addEventListener('ipc-message', (e) => {
		testSite.get(0).getWebContents().openDevTools();
		console.log(e.channel);
		console.log(e.args[0]);
	});

	// Saves all the events into the recording

	// Must check the network activity from testSite after every event and when it has stopped must create
	// a new event to check the destination address

	// Listens for the recording to stop
	// When the recording stops, saves the new recording object into a file (JSON)
});