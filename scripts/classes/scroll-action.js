function ScrollAction(x, y) {
	this.x = x;
	this.y = y;
	this.type = ActionParser.SCROLL_ACTION;

	this.perform = function(webview) {
		let actionData = { x: this.x, y: this.y };
		webview.get(0).send('scroll-playback', actionData );
	}
}
