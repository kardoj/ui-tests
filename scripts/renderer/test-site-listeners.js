// All the event listeners that are injected into the quest page
const { ipcRenderer } = require('electron');

// Need to memorize the last scroll location to be able to know if it is needed to scroll again before next action
let lastScrolledX = 0, lastScrolledY = 0;

// Keyup event targets must be with these tag names on playback
let allowedInputTagNames = ['TEXTAREA', 'INPUT'];

// Used to keep track of the input element while the user is typing
let inputElement = null;

window.onload = () => {
	// Send click events and coordinates to the <webview> element
	document.addEventListener('click', (e) => {
		handleScrolling();
		handleInput();

		// Record click action
		let el = document.elementFromPoint(e.clientX, e.clientY);
		ipcRenderer.sendToHost('click-event', { x: e.clientX, y: e.clientY, tagName: el.tagName });
	});

	document.addEventListener('keydown', (e) => {
		inputElement = document.activeElement;

		// Handle form submission with Enter
		if (e.which == 13 && inputElement.tagName == 'INPUT') {
			// Cancel submission if form was present
			e.preventDefault();

			// Record submission as an action
			handleFormSubmissionWithEnter();
		}
	});

	function handleFormSubmissionWithEnter() {
		let parentForm = inputElement.form;

		if (parentForm !== null) {
			let params = serialize(parentForm);
			let url = parentForm.getAttribute('action');
			if (url == '?') {
				url = window.location.href + url + params;
			} else {
				url += '?' + params;
			}

			// Check for input action before submission
			handleInput();

			// Send new navigation
			ipcRenderer.sendToHost('nav-event', { url: url });

			// Submit the form
			parentForm.submit();
		}
	}

    // http://stackoverflow.com/questions/11661187/form-serialize-javascript-no-framework#answer-30153391
    function serialize(form) {
        var field, s = [];
        if (typeof form == 'object' && form.nodeName == "FORM") {
            var len = form.elements.length;
            for (i=0; i<len; i++) {
                field = form.elements[i];
                if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                    if (field.type == 'select-multiple') {
                        for (j=form.elements[i].options.length-1; j>=0; j--) {
                            if(field.options[j].selected)
                                s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                        }
                    } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                        s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                    }
                }
            }
        }
        return s.join('&').replace(/%20/g, '+');
    }

	function handleInput() {
		if (inputElement !== null) {
			let bounds = inputElement.getBoundingClientRect();
			let centerX = parseInt(bounds.width / 2 + bounds.left);
			let centerY = parseInt(bounds.height / 2 + bounds.top);
			ipcRenderer.sendToHost('input-event', { x: centerX, y: centerY, input: inputElement.value });

			inputElement = null;
		}
	}

	function handleScrolling() {
		if (window.scrollX !== lastScrolledX || window.scrollY !== lastScrolledY) {
			ipcRenderer.sendToHost('scroll-event', { x: window.scrollX, y: window.scrollY });
			lastScrolledX = window.scrollX;
			lastScrolledY = window.scrollY;
		}
	}

	// Actions playback
	ipcRenderer.on('click-playback', (e, actionData) => {
		let el = document.elementFromPoint(actionData.x, actionData.y);
		let expectedTag = actionData.tagName;
		let actualTag = el.tagName;
		let info = ', expected: ' + expectedTag + ', actual: ' + actualTag;

		if (actualTag == expectedTag) {
			ipcRenderer.sendToHost('action-playback-success', { message: 'Peformed click action successfully' + info });
			el.click();
		} else {
			ipcRenderer.sendToHost('action-playback-failure', { message: 'Performed a failed click action' + info });
		}
	});

	ipcRenderer.on('nav-playback', (e, actionData) => {
		ipcRenderer.sendToHost('action-playback-success', { message: 'Peformed nav action successfully: ' + actionData.url });
		window.location.href = actionData.url;
	});

	ipcRenderer.on('scroll-playback', (e, actionData) => {
		window.scrollTo(actionData.x, actionData.y);
		ipcRenderer.sendToHost('action-playback-success', { message: 'Peformed scroll action successfully: (' + actionData.x + ', ' + actionData.y + ')' });
	});

	ipcRenderer.on('input-playback', (e, actionData) => {
		let el = document.elementFromPoint(actionData.x, actionData.y);
		let tagName = el.tagName;
		// Only try to input text if the selected element is correct, as an additional check
		if (allowedInputTagNames.indexOf(tagName) >= 0) {
			el.value = actionData.input;
			ipcRenderer.sendToHost('action-playback-success', { message: 'Performed input action on successfully: ' + tagName + '\'s value was set to ' + actionData.input });
		} else {
			ipcRenderer.sendToHost('action-playback-failure', { message: 'Performed a failed input action: selected wrong element (' + tagName + ')' });
		}
	});

	// Checks playback
	ipcRenderer.on('url-check-playback', (e, actionData) => {
		let currentURL = window.location.href;
		let expectedURL = actionData.url;
		let info = ', expected: ' + expectedURL + ', actual: ' + currentURL;

		if (currentURL == expectedURL) {
			ipcRenderer.sendToHost('action-playback-success', { message: 'Peformed url check successfully' + info });
		} else {
			ipcRenderer.sendToHost('action-playback-failure', { message: 'Performed a failed url check' + info });
		}
	});
};
