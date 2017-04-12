let Player = {};
((ns, $) => {
	let isPlaying = false;
	let recording = null;
	let performedActionCount = 0;
	let waitingForTestsiteToPerform = false;

	let contextMenu = null;
	let playTestBtn = null;
	let testSite = null;

	// Public functions
	ns.isPlaying = function() {
		return isPlaying;
	};

	// All the private stuff
	$(document).ready(() => {
		contextMenu = $('#context_menu');
		playTestBtn = $('#play_test_btn');
		testSite = $('#test_site');

		playTestBtn.on('start-playback', (e, filename) => {
			//testSite.get(0).openDevTools();
			$(document).trigger('load-recording', PATH.join(Config.testLocation, filename));
		});

		$(document).on('recording-loaded', (e, data) => {
			populateRecording(data.filedata);
			startPlayback();
			testSite.get(0).openDevTools();
		});

		$(document).on('finished-loading-after-action', () => {
			if (!isPlaying) return;
			if (performedActionCount !== recording.getActionCount()) {
				performNextAction();
			} else {
				stopPlayback();
			}
		});

		$(document).on('did-not-start-loading-after-action', () => {
			if (!isPlaying) return;
			if (performedActionCount !== recording.getActionCount()) {
				setTimeout(() => { performNextAction(); }, Config.actionTimeout);
			} else {
				stopPlayback();
			}
		});

		// Listen to testsite action feedback
		$(testSite).get(0).addEventListener('ipc-message', (e) => {
			if (!isPlaying) return;
			if (!waitingForTestsiteToPerform) return;

			waitingForTestsiteToPerform = false;

			let actionData = e.args[0];
			if (e.channel == 'action-playback-success') advance(actionData.message);
			if (e.channel == 'action-playback-failure') abort(actionData.message);
		});

		function populateRecording(dataFromFile) {
			let jsonData = JSON.parse(dataFromFile);
			recording = new Recording();

			recording.setName(jsonData.name);
			for (let i = 0; i < jsonData.actions.length; i++) recording.addAction(ActionParser.parse(jsonData.actions[i]));
		}

		function startPlayback() {
			isPlaying = true;
			performNextAction();
		}

		function performNextAction() {
			console.log('performed action ' + performedActionCount);
			let act = recording.getAction(performedActionCount);
			act.perform(testSite);
			console.log(act);
			waitingForTestsiteToPerform = true;
		}

		// Moves on to the next action after testSite has completed the action
		function advance(message) {
			console.log('ACTION SUCCESS: ' + message);
			performedActionCount++;
			$(document).trigger('performed-an-action');
		}

		// Aborts the currently running test and resets everything
		function abort(message) {
			console.log('ACTION FAIL: ' + message);
			stopPlayback();
		}

		function stopPlayback() {
			showTestResult();
			isPlaying = false;
			performedActionCount = 0;
			recording = null;
			$(document).trigger('stop-playback');
			contextMenu.find(':input').removeAttr('disabled');
		}

		function showTestResult() {
			if (recording.getActionCount() == performedActionCount) {
				console.log('TEST COMPLETED SUCCESSFULLY!');
			} else {
				console.log('TEST FAILED (' + performedActionCount + '/' + recording.getActionCount() + ')!');
			}
		}
	});
})(Player, $);
