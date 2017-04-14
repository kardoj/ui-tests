// Parses actions back to different actions from json
let ActionParser = {};
((ns, $) => {
	// Action types
	ns.CLICK_ACTION = 1;
	ns.NAV_ACTION = 2;
	ns.SCROLL_ACTION = 3;
	ns.INPUT_ACTION = 4;

	// Check types
	ns.URL_CHECK = 11;
	ns.EL_CHECK = 12;

	ns.parse = function(actionJSON) {
		switch(actionJSON.type) {
			case ns.CLICK_ACTION:
				return new ClickAction(actionJSON.x, actionJSON.y, actionJSON.tagName);
			case ns.NAV_ACTION:
				return new NavAction(actionJSON.url);
			case ns.SCROLL_ACTION:
				return new ScrollAction(actionJSON.x, actionJSON.y);
			case ns.INPUT_ACTION:
				return new InputAction(actionJSON.x, actionJSON.y, actionJSON.input);
			case ns.URL_CHECK:
				return new UrlCheck(actionJSON.url);
			case ns.EL_CHECK:
				return new ElCheck(actionJSON.x, actionJSON.y, actionJSON.tagName, actionJSON.checks);
		}
	};
})(ActionParser, $);
