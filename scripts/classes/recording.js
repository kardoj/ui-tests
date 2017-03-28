/*
* A recording of actions which can be played by Playback.
*/
function Recording() {
	this.name = null;
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

	this.setName = function(name) {
		this.name = name;
	};

	this.toJSON = function() {
		return JSON.stringify({
			name: this.name,
			actions: this.recordedActions
		});
	};
}
