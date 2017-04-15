$(document).ready(() => {
	let dialogue = $('#choose_attributes_dialogue');
	let cancelBtn = dialogue.find('#choose_attributes_cancel');
	let saveBtn = dialogue.find('#choose_attributes_save');
	let content = dialogue.find('#choose-attributes-content');
	let backlayer = $('#backlayer');
	let testSite = $('#test_site');

	$(document).on('choose-el-check-attributes', (e, data) => {
		dialogue.css('left', data.x);
		dialogue.css('top', data.y);
		content.text(data.content);
		backlayer.show();
		dialogue.show();
	});

	cancelBtn.on('click', () => {
		dialogue.hide();
		backlayer.hide();
		testSite.get(0).send('record-state');
		$(document).trigger('assertion-cancelled');
	});

	saveBtn.on('click', (e) => {
	});
});
