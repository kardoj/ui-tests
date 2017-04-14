// Contains an attribute check or element existence check
// checks is an array of simple check objects (eg. [{ attribute: 'exists', value: 'true' }, { attribute: 'class', value: 'center' }])
// exists is a special attribute and is treated not as element's attribute but check whether or not the element was found (tagName match only)
function ElCheck(x, y, tagName, checks) {
	this.x = x;
	this.y = y;
	this.tagName = tagName;
	this.checks = checks;
	this.type = ActionParser.EL_CHECK;

	this.perform = function(webview) {
		let actionData = {
			x: this.x,
			y: this.y,
			tagName: this.tagName,
			checks: this.checks
		};

		webview.get(0).send('el-check-playback', actionData);
	};
}
