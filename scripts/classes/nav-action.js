function NavAction(url) {
	this.url = url;

	this.play = function(webview) {
		webview.loadUrl(this.url);
	};
}
