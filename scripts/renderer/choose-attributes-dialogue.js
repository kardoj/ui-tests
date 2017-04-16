$(document).ready(() => {
	let dialogue = $('#choose_attributes_dialogue');
	let cancelBtn = dialogue.find('#choose_attributes_cancel');
	let contextMenu = $('#context_menu');
	let saveBtn = dialogue.find('#choose_attributes_save');
	let contentDiv = dialogue.find('#choose_attributes_content');
	let tagContainer = dialogue.find('#tag_container');
	let backlayer = $('#backlayer');
	let testSite = $('#test_site');

	// Store the current data to be able to send it back to recorder
	let actionData = null;

	$(document).on('choose-el-check-attributes', (e, data) => {
		actionData = data;
		dialogue.css('left', data.x);
		dialogue.css('top', data.y + contextMenu.height() * 2);
		populateData(data.content);
		tagContainer.text(data.tagName);
		backlayer.show();
		dialogue.show();
		saveBtn.focus();
	});

	cancelBtn.on('click', () => {
		$(document).trigger('assertion-cancelled');
		close();
	});

	saveBtn.on('click', (e) => {
		let checkedItems = contentDiv.find('li input:checked');
		var checks = [];
		checkedItems.each(function() {
			let checkbox = $(this);
			checks.push({
				name: checkbox.attr('chk-name'),
				value: checkbox.attr('chk-value')
			});
		});

		// Sends chosen checks back to the recorder
		$(document).trigger('el-check-attributes-chosen', { x: actionData.x, y: actionData.y, tagName: actionData.tagName, checks: checks });
		actionData = null;
		close();
	});

	// Close the dialogue and notify test site to set the state back to recording
	function close() {
		dialogue.hide();
		backlayer.hide();
		testSite.get(0).send('record-state');
	}

	// Translations for the special attributes
	let translations = {
		exists: 'Olemasolu',
		contents: 'Sisu'
	};

	function populateData(content) {
		let html = ['<ul class="attribute-list">'];
		for (let i = 0; i < content.length; i++) {
			let item = content[i];
			let checked = item.name == 'exists' ? 'checked="checked"' : '';
			html.push('<li>');
			html.push('<input type="checkbox" chk-name="' + item.name + '" chk-value="' + item.value + '" id="' + i + '" ' + checked + '>');
			let translation = translations[item.name];
			if (translation !== undefined) {
				if (item.name == 'exists') {
					html.push(translation);
				} else {
					html.push(translation);
					html.push(': ');
					html.push(Utility.shortenString(item.value));
				}
			} else {
				html.push(Utility.shortenString(item.name));
				html.push(': ');
				html.push(Utility.shortenString(item.value));
			}
			html.push('</li>');
		}
		html.push('</ul>');
		contentDiv.html(html.join(''));
	}
});
