/*
* A recording of actions which can be played by Playback.
*/
function Recording(startTime) {
  this.recordedActions = [];
  this.startTime = startTime;

  this.addAction = function(action) {
	  this.recordedActions.push(action);
  };

  this.getActions = function() {
	  return this.recordedActions;
  };

  this.getStartTime = function() {
	  return this.startTime;
  };
}
