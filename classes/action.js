/*
* A single test action with it's attributes
*/
function Action(x, y, recordedAt) {
  this.x = x;
  this.y = y;
  this.recordedAt = recordedAt;

  this.queuePlayback = function(delay) {
	  var that = this;
	  setTimeout(function() {
		  document.elementFromPoint(that.x, that.y).click();
	  }, delay);
  };

  this.getRecordedAt = function() {
	  return this.recordedAt;
  };
}
