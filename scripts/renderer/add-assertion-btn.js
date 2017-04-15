$(document).ready(() => {
	let addAssertionBtn = $('#add_assertion_btn');

	addAssertionBtn.on('click', () => {
		addAssertionBtn.trigger('add-assertion');
		addAssertionBtn.attr('disabled', 'disabled');
	});

	$(document).on('assertion-cancelled', () => {
		addAssertionBtn.removeAttr('disabled');
	});
});
