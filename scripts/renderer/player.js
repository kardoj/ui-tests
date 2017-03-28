let Player = {};
((ns, $) => {
	let isPlaying = false;
	let recording = null;
	let performedActionCount = 0;

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
			recording.getAction(performedActionCount).perform();
			performedActionCount++;
			$(document).trigger('performed-an-action');
		}

		function stopPlayback() {
			isPlaying = false;
			performedActionCount = 0;
			recording = null;
			$(document).trigger('stop-playback');
			contextMenu.find(':input').removeAttr('disabled');
		}
	});
})(Player, $);
