function NavAction(url) {
	this.url = url;
	this.type = ActionParser.NAV_ACTION;

	this.perform = function(webview) {
		let actionData = { url: this.url };
		webview.get(0).send('nav-action', actionData );
	};
}
