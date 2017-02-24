// To capture events from main (mainly menu interaction)
const ipc = require('electron').ipcRenderer;

window.onload = () => {
    let contextMenu = document.getElementById('context_menu');
	let addressInput = document.getElementById('address_input');
    let mainView = document.getElementById('main_view');

    // Initialization
	addressInput.focus();
    setMainViewSize();

	// Listeners
	document.getElementById('navigate_btn').addEventListener('click', (e) => {
		navigateMainView();
	});

	ipc.on('mainview-resize', () => {
		setMainViewSize();
	});

	document.addEventListener('keypress', (e) => {
		if (e.which === 13) {
			navigateMainView();
		}
	});

	function navigateMainView() {
		if (addressInput.value === '') return;
		mainView.loadURL(addressInput.value);
	}

    // Calculates and sets mainView's size so that it fills all the available area
    function setMainViewSize() {
        let newHeight = window.innerHeight - contextMenu.clientHeight;
        mainView.style.height = newHeight + 'px';
    }
};