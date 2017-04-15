// All the event listeners that are injected into the quest page
const { ipcRenderer } = require('electron');

// Need to memorize the last scroll location to be able to know if it is needed to scroll again before next action
let lastScrolledX = 0, lastScrolledY = 0;

// Keyup event targets must be with these tag names on playback
let allowedInputTagNames = ['TEXTAREA', 'INPUT'];

// Used to keep track of the input element while the user is typing
let inputElement = null;

// Keeps track of the test site state
// NB! All event emissions should go trough this object to make sure that state check is applied in one place
let stateFilter = {
	// The tested site can be in one of two different states:
	// STATE_RECORD - is sending out all the events that are not related to adding a check
	// STATE_ADD_CHECK - is sending out only the events that are related to adding a check
	// The reasoning behind two different states is that the recording can not be allowed
	// to register the regular actions when adding a check (ClickAction for example, since it
	// is used to select an element rather than register a click on it).
	states: {
		STATE_RECORD: 'STATE_RECORD',
		STATE_ADD_CHECK: 'STATE_ADD_CHECK'
	},

	currentState: null,

	// Which events are allowed to go through in which state
	allowedEvents: {
		STATE_RECORD: ['click-event', 'input-event', 'nav-event', 'scroll-event'],
		STATE_ADD_CHECK: ['click-event', 'scroll-event', 'choose-el-check']
	},

	// All the events should go through this
	emit: function(eventName, data) {
		if (this.allowedEvents[this.currentState].indexOf(eventName) >= 0) {
			ipcRenderer.sendToHost(eventName, data);
		}
	},

	setState: function(state) {
		if (this.states[state] !== undefined) {
			this.currentState = state;
		}
	},

	getState: function() { return this.currentState; }
};

// Always start with the record state
// Resetting after every page load should not matter since adding a check should
// not span over page changes
stateFilter.setState(stateFilter.states.STATE_RECORD);

window.onload = () => {
	console.log('listeners');

	document.addEventListener('click', (e) => {
		if (stateFilter.getState() == stateFilter.states.STATE_ADD_CHECK) {
			// Temporary enable pointerEvents to get the event target
			// When pointerEvents are set to none, event target is always <html>
			let body = document.getElementsByTagName('body')[0];
			body.style.pointerEvents = 'visible';
			let el = document.elementFromPoint(e.clientX, e.clientY);
			body.style.pointerEvents = 'none';

			// Sends a signal to the <webview> that dialogue needs to be opened (received by recorder)
			stateFilter.emit('choose-el-check', { x: e.clientX, y: e.clientY, tagName: el.tagName, checkOptions: buildCheckOptions(el) });
		} else {
			handleScrolling();
			handleInput();

			let el = document.elementFromPoint(e.clientX, e.clientY);
			stateFilter.emit('click-event', { x: e.clientX, y: e.clientY, tagName: el.tagName });
		}
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

	function buildCheckOptions(el) {
		let attributes = el.attributes;
		let options = [];

		// Existence check is the first option
		options.push({ name: 'exists', value: null });

		// Add content option
		options.push({ name: 'contents', value: shorten(el.innerHTML) });

		for (let i = 0; i < attributes.length; i++) {
			options.push({
				name: attributes[i].name,
				value: shorten(attributes[i].value)
			});
		}

		return options;
	}

	function shorten(str) {
		if (str.length > 30) str = str.substring(0, 10) + ' ... ' + str.substring(str.length - 10);
		return str;
	}

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
			stateFilter.emit('nav-event', { url: url });

			// Submit the form
			parentForm.submit();
		}
	}

	// http://stackoverflow.com/questions/11661187/form-serialize-javascript-no-framework#answer-30153391
	// TODO: Move to a custom module
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

	function getElementCenter(element) {
		let bounds = element.getBoundingClientRect();
		let centerX = parseInt(bounds.width / 2 + bounds.left);
		let centerY = parseInt(bounds.height / 2 + bounds.top);
		return { x: centerX, y: centerY };
	}

	function handleInput() {
		if (inputElement !== null) {
			let center = getElementCenter(inputElement);
			stateFilter.emit('input-event', { x: center.x, y: center.y, input: inputElement.value });
			inputElement = null;
		}
	}

	function handleScrolling() {
		if (window.scrollX !== lastScrolledX || window.scrollY !== lastScrolledY) {
			stateFilter.emit('scroll-event', { x: window.scrollX, y: window.scrollY });
			lastScrolledX = window.scrollX;
			lastScrolledY = window.scrollY;
		}
	}

	// A signal that the site needs to go to check adding state
	ipcRenderer.on('add-check-state', () => {
		stateFilter.setState(stateFilter.states.STATE_ADD_CHECK);
		document.getElementsByTagName('body')[0].style.pointerEvents = 'none';
	});

	// A signal that the site needs to go to recording state
	ipcRenderer.on('record-state', () => {
		stateFilter.setState(stateFilter.states.STATE_RECORD);
		document.getElementsByTagName('body')[0].style.pointerEvents = 'visible';
	});

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
