$(document).ready(() => {
	console.log('laetakse');
	let contextMenu = $('#context_menu');
	let testSite = $('#test_site');

	// Initialization when the program starts and mainWindow is opened
	resizeTestSite();
	setTimeout(function() {
		clickEventPlaybackTest();
	}, 3000);
	console.log(ipc);

	// When the window size is changed from back-end (main.js, menu.js),
	// testSite's height needs to be recalculated to avoid content overflow
	ipc.on('test-site-resize', () => {
		resizeTestSite();
	});

	// Listen for the clicks from the testSite
	testSite.get(0).addEventListener('ipc-message', (e) => {
		testSite.get(0).getWebContents().openDevTools();
		console.log(e.channel);
		console.log(e.args[0]);
	});

	// Testing how to send clicks back to the testSite (page inside the webview)
	function clickEventPlaybackTest() {
		testSite.get(0).send('click-playback', { coords: { x: 100, y: 100 } });
	}

	// Calculates and sets testSite's size so that it fills all the available area
	function resizeTestSite() {
		let newHeight = window.innerHeight - contextMenu.get(0).clientHeight;
		testSite.css('height', newHeight);
	}
});