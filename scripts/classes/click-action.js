function ClickAction(x, y) {
	this.x = x;
	this.y = y;
	this.type = ActionParser.CLICK_ACTION;

	this.perform = function(webview) {
		webview.get(0).send('click-playback', { x: this.x, y: this.y });
		console.log('performed click action');
	}
}
