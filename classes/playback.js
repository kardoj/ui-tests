/*
* A player that generates playbacks from recordings and plays them.
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
