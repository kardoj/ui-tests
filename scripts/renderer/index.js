const ipc = require('electron').ipcRenderer;
const $ = require('jQuery');

window.onload = () => {
	let contextMenu = $('#context_menu');
	let testSite = $('#test_site');
	let addressInput = $('#address_input');
	let startRecButton = $('#start_recording');

	// Initialization when the program starts and mainWindow is opened
	addressInput.focus();
	setTestSiteSize();
	setTimeout(function() {
		clickEventPlaybackTest();
	}, 3000);

	// When the window size is changed from back-end (main.js, menu.js),
	// testSite's height needs to be recalculated to avoid content overflow
	ipc.on('test-site-resize', () => {
		setTestSiteSize();
	});

	// Listen for the clicks from the testSite page
	testSite.get(0).addEventListener('ipc-message', (e) => {
		testSite.get(0).getWebContents().openDevTools();
		console.log(e.channel);
		console.log(e.args[0]);
	});

	// Navigation by pressing the Enter key
	addressInput.on('keypress', (e) => {
		if (e.which === 13) navigateTestSite(addressInput.val());
	});

	contextMenu.find('#navigate_btn').on('click', (e) => {
		navigateTestSite(addressInput.val());
	});

	// Testing how to send clicks back to the testSite (page inside the webview)
	function clickEventPlaybackTest() {
		testSite.get(0).send('click-playback', { coords: { x: 100, y: 100 } });
	}

	function navigateTestSite(address) {
		if (address === '') return;

		// Prefix the address with http:// when it is not present because it is required by loadURL
		if (!address.startsWith('http://')) address = 'http://' + address;
		
		testSite.get(0).loadURL(address);
	}

	// Calculates and sets testSite's size so that it fills all the available area
	function setTestSiteSize() {
		let newHeight = window.innerHeight - contextMenu.get(0).clientHeight;
		testSite.css('height', newHeight);
	}
};