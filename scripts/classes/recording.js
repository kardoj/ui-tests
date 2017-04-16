/*
* A recording of actions which can be played by Playback.
*/
function Recording(windowWidth, windowHeight) {
	this.name = null;
	// The test is always run in these parent window dimensions
	this.windowWidth = windowWidth;
	this.windowHeight = windowHeight;
	this.recordedActions = [];
	this.hasActions = false;

	this.addAction = function(action) {
		this.hasActions = true;
		this.recordedActions.push(action);
	};

	this.getActions = function() {
		return this.recordedActions;
	};

	this.getActionCount = function() {
		return this.recordedActions.length;
	};

	// Returns the n'th action
	this.getAction = function(n) {
		if (n < 0 || n > this.recordedActions.length - 1) return null;
		return this.recordedActions[n];
	};

	this.getWindowWidth = function() {
		return this.windowWidth;
	};

	this.setWindowWidth = function(width) {
		this.windowWidth = width;
	};

	this.setWindowHeight = function(height) {
		this.windowHeight = height;
	};

	this.getWindowHeight = function() {
		return this.windowHeight;
	};

	this.setName = function(name) {
		this.name = name;
	};

	this.getName = function() {
		return this.name;
	};

	this.toJSON = function() {
		return JSON.stringify({
			name: this.name,
			windowWidth: this.windowWidth,
			windowHeight: this.windowHeight,
			actions: this.recordedActions
		});
	};
}
