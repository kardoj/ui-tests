function UrlCheck(url) {
	this.url = url;
	this.type = ActionParser.URL_CHECK;

	this.perform = function(webview) {
		console.log('UrlCheck: performed');
		let actionData = { url: this.url };
		webview.get(0).send('url-check-playback', actionData );
	};
}
