function ClickAction(x, y) {
	this.x = x;
	this.y = y;

	this.play = function(document) {
		let el = document.elementFromPoint(this.x, this.y);
		el.click();
	};
}
