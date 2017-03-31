let Config = {};
((ns) => {
	ns.testLocation = 'tests';
	ns.testFileExtension = '.uitest';

	// Timeout between playback of the actions which do not trigger page load.
	// Needs to be changed if the tested page contains animations that take longer
	// than timeout milliseconds to complete. Should be able to be relatively short (200-500)
	ns.actionTimeout = 3000;

	// When an action has been performed (recorded or played back), the performer waits for this time to see if
	// the page has started loading. Probably can be a very small number to speed up tests
	// because the page should start loading pretty quickly if a link was pressed
	ns.actionLoadingTimeout = 3000;
})(Config);
