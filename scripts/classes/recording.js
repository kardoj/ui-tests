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
