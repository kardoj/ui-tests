// Contains some of the utility methods to make the implementation easily changeable if needed
var Utility = Utility || {};
((ns) => {
	ns.timestamp = function() { return new Date().getTime(); };
})(Utility);
