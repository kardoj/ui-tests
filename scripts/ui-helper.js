let UiHelper = {};
((ns) => {
	ns.centerElement = function(element) {
		element.css({
			left: '50%',
			marginLeft: -element.width() / 2 + 'px',
			marginTop: -element.height() / 2 + 'px',
			top: '50%'
		});
	};
})(UiHelper);
