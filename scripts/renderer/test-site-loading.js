$(document).ready(() => {
	let testSite = $('#test_site');
	let loadingDialogue = $('#loading_dialogue');
	let backlayer = $('#backlayer');

	testSite.get(0).addEventListener('did-start-loading', () => {
		UiHelper.centerElement(loadingDialogue);
		loadingDialogue.show();
		backlayer.show();
	});

	testSite.get(0).addEventListener('did-stop-loading', () => {
		loadingDialogue.hide();
		backlayer.hide();
	});
});
