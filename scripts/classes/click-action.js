function ClickAction(x, y, tagName) {
	this.x = x;
	this.y = y;
	this.tagName = tagName;
	this.type = ActionParser.CLICK_ACTION;

	this.perform = function(webview) {
		let actionData = {
			x: this.x,
			y: this.y,
			tagName: this.tagName
		};

		webview.get(0).send('click-playback', actionData);
	};
}
