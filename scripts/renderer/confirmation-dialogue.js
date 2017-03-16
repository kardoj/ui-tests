// Dialogue must be opened with a caller reference and an optional message, for example:
// $(document).trigger('get-confirmation', { caller: 'delete_test_btn', message: 'Are you sure?' });
// When the dialogue closes, it emits:
// $(document).trigger('got-confirmation', { for: 'delete_test_btn', confirmed: true });
// So all the callers can listen to 'got-confirmation' event and see if they got an answer
$(document).ready(() => {
	let dialogue = $('#confirmation-dialogue');
	let confirmBtn = dialogue.find('#confirm_btn');
	let cancelBtn = dialogue.find('#cancel_btn');
	let confirmationMessageContainer = dialogue.find('#confirmation_dialogue_message');
	let backlayer = $('#backlayer');
	let caller = null;

	$(document).on('get-confirmation', (e, data) => {
		// If caller is not set, quit
		if (data.caller === undefined) return;
		caller = data.caller;

		// Only support one confirmation at a time at the moment
		if ($('dialogue').is(':visible')) return;

		// Empty the message in case it was there from before
		confirmationMessageContainer.empty();
		if (data.message !== undefined) confirmationMessageContainer.text(data.message);

		// Center the dialogue before showing. Every time. Just in case.
		UiHelper.centerElement(dialogue);

		// Do what is needed
		backlayer.show();
		dialogue.show();
		cancelBtn.focus();
	});

	confirmBtn.on('click', () => {
		gotConfirmation(true);
	});

	cancelBtn.on('click', () => {
		gotConfirmation(false);
	});

	function gotConfirmation(confirmationResult) {
		$(document).trigger('got-confirmation', { for: caller, confirmed: confirmationResult });
		dialogue.hide();
		backlayer.hide();
		caller = null;
	}
});
