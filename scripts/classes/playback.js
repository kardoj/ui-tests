/*
* A player that generates playback from a recording and plays it.
*/
function Playback(recording) {
	this.recording = recording;

	this.play = function() {
		var recordedActions = this.recording.getActions();
		for (var i = 0; i < recordedActions.length; i++) {
			queueActionPlayback.call(this, recordedActions[i]);
		}
	};

	function queueActionPlayback(action) {
		var recordingStartTime = this.recording.getStartTime();
		action.queuePlayback(action.getRecordedAt() - recordingStartTime);
	}
}
