$(document).ready(() => {
	let contextMenu = $('#context_menu');
	let testSite = $('#test_site');

	// Initialization when the program starts and mainWindow is opened
	resizeTestSite();

	// When the window size is changed from back-end (main.js, menu.js),
	// testSite's height needs to be recalculated to avoid content overflow
	IPC.on('test-site-resize', () => {
		resizeTestSite();
	});

	// Calculates and sets testSite's size so that it fills all the available area
	function resizeTestSite() {
		let newHeight = window.innerHeight - contextMenu.get(0).clientHeight;
		testSite.css('height', newHeight);
	}
});
