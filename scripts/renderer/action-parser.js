// Parses actions back to different actions from json
let ActionParser = {};
((ns, $) => {
	// Action types
	ns.CLICK_ACTION = 1;
	ns.NAV_ACTION = 2;

	// Check types
	ns.URL_CHECK = 11;

	ns.parse = function(actionJSON) {
		switch(actionJSON.type) {
			case ns.CLICK_ACTION:
				return new ClickAction(actionJSON.x, actionJSON.y, actionJSON.tagName);
			case ns.NAV_ACTION:
				return new NavAction(actionJSON.url);
			case ns.URL_CHECK:
				return new UrlCheck(actionJSON.url);
		}
	};
})(ActionParser, $);
