const ipc = require('electron').ipcRenderer;
const $ = require('jQuery');

window.onload = () => {
	let contextMenu = $('#context_menu');
	let mainView = $('#main_view');
	let addressInput = $('#address_input');
	let startRecButton = $('#start_recording');

	// Initialization when the program starts and mainWindow is opened
	addressInput.focus();
	setMainViewSize();
	setTimeout(function() {
		clickEventPlaybackTest();
	}, 3000);

	// When the window size is changed from back-end (main.js, menu.js),
	// mainView's height needs to be recalculated to avoid content overflow
	ipc.on('mainview-resize', () => {
		setMainViewSize();
	});

	// Listen for the clicks from the mainView page
	mainView.get(0).addEventListener('ipc-message', (e) => {
		mainView.get(0).getWebContents().openDevTools();
		console.log(e.channel);
		console.log(e.args[0]);
	});

	// Navigation by pressing the Enter key
	addressInput.on('keypress', (e) => {
		if (e.which === 13) navigateMainView(addressInput.val());
	});

	contextMenu.find('#navigate_btn').on('click', (e) => {
		navigateMainView(addressInput.val());
	});

	// Testing how to send clicks back to the mainView (page inside the webview)
	function clickEventPlaybackTest() {
		mainView.get(0).send('click-playback', { coords: { x: 100, y: 100 } });
	}

	function navigateMainView(address) {
		if (address === '') return;

		// Prefix the address with http:// when it is not present because it is required by loadURL
		if (!address.startsWith('http://')) address = 'http://' + address;
		
		mainView.get(0).loadURL(address);
	}

	// Calculates and sets mainView's size so that it fills all the available area
	function setMainViewSize() {
		let newHeight = window.innerHeight - contextMenu.get(0).clientHeight;
		mainView.css('height', newHeight);
	}
};