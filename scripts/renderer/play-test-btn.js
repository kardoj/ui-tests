$(document).ready(() => {
	let contextMenu = $('#context_menu');
	let playTestBtn = $('#play_test_btn');
	let testSelect = $('#test_select');

	playTestBtn.on('click', () => {
		selectedFilename = testSelect.val();
		if (!selectedFilename) return;

		playTestBtn.trigger('start-playback', selectedFilename);

		contextMenu.find(':input').attr('disabled', 'disabled');
	});
});
