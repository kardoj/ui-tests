function UrlCheck(url) {
	this.url = url;
	this.type = ActionParser.URL_CHECK;

	this.check = function(webview) {
		return webview.getUrl() == this.url;
	};
}
