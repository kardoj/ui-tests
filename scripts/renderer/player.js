let Player = {};
((ns, $) => {
	let isPlaying = false;
	let recording = null;
	let performedActionCount = 0;
	let waitingForTestsiteToPerform = false;

	let contextMenu = null;
	let playTestBtn = null;
	let testSite = null;

	// Public methods
	ns.isPlaying = function() {
		return isPlaying;
	};

	// All the private stuff
	$(document).ready(() => {
		contextMenu = $('#context_menu');
		playTestBtn = $('#play_test_btn');
		testSite = $('#test_site');

		playTestBtn.on('start-playback', (e, filename) => {
			$(document).trigger('read-recording', PATH.join(Config.testLocation, filename));
		});

		$(document).on('recording-loaded', (e, data) => {
			let jsonData = JSON.parse(data.filedata);
			recording = new Recording();

			recording.setName(jsonData.name);
			for (let i = 0; i < jsonData.actions.length; i++) {
				recording.addAction(ActionParser.parse(jsonData.actions[i]));
			}

			startPlayback();
		});

		$(document).on('finished-loading-after-performing-an-action did-not-start-loading-after-action', () => {
			if (!isPlaying) return;
			if (performedActionCount !== recording.getActionCount()) {
				performNextAction();
			} else {
				stopPlayback();
			}
		});

		function startPlayback() {
			isPlaying = true;
			performNextAction();
		}

		function performNextAction() {
			recording.getAction(performedActionCount).perform(testSite);
			performedActionCount++;
			waitingForTestsiteToPerform = true;
		}

		// Listen to testsite action feedback
		$(testSite).get(0).addEventListener('ipc-message', (e) => {
			if (!waitingForTestsiteToPerform && !isPlaying) return;

			waitingForTestsiteToPerform = false;

			let actionData = e.args[0];
			if (e.channel == 'action-playback-success') advance(actionData.message);
			if (e.channel == 'action-playback-failure') abort(actionData.message);
		});

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

		function stopPlayback() {
			isPlaying = false;
			performedActionCount = 0;
			recording = null;
			$(document).trigger('stop-playback');
			contextMenu.find(':input').removeAttr('disabled');
			console.log('TEST COMPLETED SUCCESSFULLY!');
		}
	});
})(Player, $);
