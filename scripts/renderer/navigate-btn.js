$(document).ready(() => {
	let addressInput = $('#address_input');
	let contextMenu = $('#context_menu');
	let testSite = $('#test_site');

	addressInput.focus();

	contextMenu.find('#navigate_btn').on('click', (e) => {
		navigateTestSite(addressInput.val());
	});

	// Navigation by pressing the Enter key
	addressInput.on('keypress', (e) => {
		if (e.which === 13 && addressInput.val()) navigateTestSite(addressInput.val());
	});

	function navigateTestSite(address) {
		// Prefix the address with http:// when it is not present because it is required by loadURL
		if (!address.startsWith('http://')) address = 'http://' + address;

		testSite.get(0).loadURL(address);
	}
});
