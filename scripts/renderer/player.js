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
			$(document).trigger('load-recording', PATH.join(Config.testLocation, filename));
		});

		$(document).on('recording-loaded', (e, data) => {
			populateRecording(data.filedata);
			startPlayback();
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

		$(document).on('cancel-playback', () => {
			if (!isPlaying) return;
			stopPlayback(true);
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
			$(document).trigger('playback-play-start', { totalActionCount: recording.getActionCount(), name: recording.getName() });
			isPlaying = true;
			performNextAction();
		}

		function performNextAction() {
			console.log('performed action ' + performedActionCount);
			let act = recording.getAction(performedActionCount);
			act.perform(testSite);
			performedActionCount++;
			console.log(act);
			$(document).trigger('playback-play-next-action', {
				performedActionCount: performedActionCount,
				actionHumanName: act.humanName
			});
			waitingForTestsiteToPerform = true;
		}

		// Moves on to the next action after testSite has completed the action
		function advance(message) {
			console.log('ACTION SUCCESS: ' + message);
			$(document).trigger('performed-an-action');
		}

		// Aborts the currently running test and resets everything
		function abort(message) {
			console.log('ACTION FAIL: ' + message);
			stopPlayback();
		}

		function stopPlayback(cancelled = false) {
			showTestResult();
			contextMenu.find(':input').removeAttr('disabled');
			// TODO: get some additional feedback on failure
			$(document).trigger('playback-play-stop', { success: recording.getActionCount() == performedActionCount, cancelled: cancelled });
			isPlaying = false;
			performedActionCount = 0;
			recording = null;
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
