function UrlCheck(url) {
	this.url = url;
	this.type = ActionParser.URL_CHECK;

	this.perform = function(webview) {
		console.log('performed url check');
		console.log('Url check result: ' + webview.get(0).getURL() == this.url);
	};
}
