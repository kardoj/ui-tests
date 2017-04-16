// Keeping track of the current window size. Updated every time window size is changed,
// including when the window is created. So there is no need to always query the main process for them.
let WindowSize = {};
((ns) => {
	// Dimensions are set as soon as the window is created
	ns.width = 0;
	ns.height = 0;

	IPC.on('test-site-resize', (e, dimensions) => {
		ns.width = dimensions.width;
		ns.height = dimensions.height;
	});
})(WindowSize);
