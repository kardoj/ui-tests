function NavAction(url) {
	this.url = url;
	this.type = ActionParser.NAV_ACTION;

	this.play = function(webview) {
		webview.loadUrl(this.url);
	};

	this.perform = function() {
		console.log('performed nav action');
	};
}
