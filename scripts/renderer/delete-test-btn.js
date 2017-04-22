$(document).ready(() => {
	let deleteTestBtn = $('#delete_test_btn');
	let testSelect = $('#test_select');
	let selectedFilename = null;

	// To determine that the confirmation was for this element
	let confirmationIdentifier = 'delete_test_btn';

	// To make sure there can be less tricky situations (somehow confirmed in some other situation?)
	let waitingForConfirmation = false;

	deleteTestBtn.on('click', () => {
		selectedFilename = testSelect.val();
		if (!selectedFilename) return;

		let message = 'Kustutada ' + testSelect.find('option:selected').text() + '?';
		$(document).trigger('get-confirmation', { caller: confirmationIdentifier, message: message });
		waitingForConfirmation = true;
	});

	$(document).on('got-confirmation', (e, data) => {
		// Do nothing if the confirmation was not for this element
		if (data.for !== confirmationIdentifier) return;
		waitingForConfirmation = false;

		// If the user did not confirm, do nothing
		if (data.confirmed === false) return;

		// If here, green light to delete the chosen test
		IPC.send('delete-recording-file', selectedFilename);
	});

	IPC.on('recording-file-deleted', () => {
		$(document).trigger('recording-deleted');
	});
});
