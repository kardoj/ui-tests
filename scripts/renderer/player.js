let Player = {};
((ns, $) => {
	let isPlaying = false;
	let recording = null;

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
			FS.readFile(PATH.join(Config.testLocation, filename), (err, data) => {
				if (err) throw err;

				let jsonData = JSON.parse(data);
				recording = new Recording();

				recording.setName(jsonData.name);
				for (var i = 0; i < jsonData.actions.length; i++) {
					recording.addAction(ActionParser.parse(jsonData.actions[i]));
				}
			});

			isPlaying = true;

			// Play the recording

			$(document).trigger('stop-playback');
			contextMenu.find(':input').removeAttr('disabled');

		});
	});
})(Player, $);
