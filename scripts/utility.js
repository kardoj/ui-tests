// Contains some of the utility methods to make the implementation easily changeable if needed
let Utility = {};
((ns) => {
	ns.timestamp = function() { return new Date().getTime(); };

	ns.shortenString = function(str) {
		if (str === null || str === undefined) return str;
		return str.length > 30 ? str.substring(0, 10) + ' ... ' + str.substring(str.length - 10) : str;
	};
})(Utility);
