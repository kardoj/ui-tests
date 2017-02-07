const ipc = require('electron').ipcRenderer;

ipc.on('open-address-input', () => {
	console.log('luls');
});

window.onload = function() {
	document.getElementById('address_submit').addEventListener('click', function() {
		var address = document.getElementById('address').value;
		if (address !== '') {
			window.location.href = address;
		} else {
			alert('Aadressiväli on tühi!');
		}
	});
};
