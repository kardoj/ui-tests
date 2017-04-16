$(document).ready(() => {
	let addAssertionBtn = $('#add_assertion_btn');
	let doc = $(document);

	addAssertionBtn.on('click', () => {
		addAssertionBtn.trigger('add-assertion');
		addAssertionBtn.attr('disabled', 'disabled');
	});

	doc.on('assertion-cancelled el-check-attributes-chosen', () => {
		addAssertionBtn.removeAttr('disabled');
	});

	doc.on('playback-play-stop', () => {
		addAssertionBtn.attr('disabled', 'disabled');
	});
});
