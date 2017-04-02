function InputAction(x, y, input) {
	this.x = x;
	this.y = y;
	this.input = input;
	this.type = ActionParser.INPUT_ACTION;

	this.perform = function(webview) {
		let actionData = {
			x: this.x,
			y: this.y,
			input: this.input
		};

		webview.get(0).send('input-playback', actionData);
	}
}
