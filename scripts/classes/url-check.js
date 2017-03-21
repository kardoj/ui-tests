function UrlCheck(url) {
	this.url = url;

	this.check = function(webview) {
		return webview.getUrl() == this.url;
	};
}
