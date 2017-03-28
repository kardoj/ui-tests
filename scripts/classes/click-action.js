function ClickAction(x, y) {
	this.x = x;
	this.y = y;
	this.type = ActionParser.CLICK_ACTION;

	this.play = function(document) {
		let el = document.elementFromPoint(this.x, this.y);
		el.click();
	};

	this.perform = function() {
		console.log('performed click action');
	}
}
