function NavAction(url) {
	this.url = url;
	this.type = ActionParser.NAV_ACTION;

	this.perform = function(webview) {
		webview.get(0).loadURL(this.url);
		console.log('performed nav action');
	};
}
