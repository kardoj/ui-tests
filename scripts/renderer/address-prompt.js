const app = require('electron').remote.app;

window.onload = function() {
	let addressInput = document.getElementById('address_input');
	addressInput.focus();

	document.getElementById('navigate_btn').addEventListener('click', function(e) {
		navigate();
	});

	document.addEventListener('keypress', (e) => {
		if (e.which === 13) {
			navigate();
		}
	});

	function navigate() {
		if (addressInput.value === '') return;
		let mainWindow = app.getMainWindow();
		mainWindow.loadURL(addressInput.value);
		app.getAddressPrompt().destroy();
	}
};
