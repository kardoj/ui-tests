/*
* A recording of actions which can be played by Playback.
*/
function Recording(startTime) {
	this.name = null;
	this.recordedActions = [];
	this.startTime = startTime;
	this.hasActions = false;

	this.addAction = function(action) {
		this.hasActions = true;
		this.recordedActions.push(action);
	};

	this.getActions = function() {
		return this.recordedActions;
	};

	this.getStartTime = function() {
		return this.startTime;
	};

	this.toJSON = function() {
		return JSON.stringify({
			name: this.name,
			actions: this.recordedActions
		});
	};
}
