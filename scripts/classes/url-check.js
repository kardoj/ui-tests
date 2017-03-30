function UrlCheck(url) {
	this.url = url;
	this.type = ActionParser.URL_CHECK;

	this.perform = function(webview) {
		let actionData = { url: this.url };
		webview.get(0).send('url-check', actionData );
	};
}
