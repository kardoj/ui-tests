let Config = {};
((ns) => {
	ns.testLocation = 'tests';
	ns.testFileExtension = '.uitest';

	// Timeout between playback of the actions which do not trigger page load.
	// Needs to be changed if the tested page contains animations that take longer
	// than timeout milliseconds to complete
	ns.timeout = 3000;
})(Config);
