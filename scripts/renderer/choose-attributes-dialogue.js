$(document).ready(() => {
	let dialogue = $('#choose_attributes_dialogue');
	let cancelBtn = dialogue.find('#choose_attributes_cancel');
	let saveBtn = dialogue.find('#choose_attributes_save');
	let contentDiv = dialogue.find('#choose_attributes_content');
	let backlayer = $('#backlayer');
	let testSite = $('#test_site');

	$(document).on('choose-el-check-attributes', (e, data) => {
		dialogue.css('left', data.x);
		dialogue.css('top', data.y);
		populateData(data.content);
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

	function populateData(content) {
		let html = ['<ul class="attribute-list">'];
		for (let i = 0; i < content.length; i++) {
			let item = content[i];
			let checked = item.name == 'exists' ? 'checked="checked"' : '';
			html.push('<li>');
			html.push('<input type="checkbox" id="' + i + '" ' + checked + '>');
			html.push(item.name);
			html.push(': ');
			html.push(item.value);
			html.push('</li>');
		}
		html.push('</ul>');
		contentDiv.html(html.join(''));
	}
});
