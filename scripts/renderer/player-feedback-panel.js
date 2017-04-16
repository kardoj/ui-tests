$(document).ready(() => {
	let feedbackPanel = $('#player_feedback_panel');
	let stepsDone = feedbackPanel.find('#steps_done');
	let stepsTotal = feedbackPanel.find('#steps_total');
	let stepName = feedbackPanel.find('#step_name');
	let testName = feedbackPanel.find('#test_name');
	let closeBtn = feedbackPanel.find('#close_btn');
	let cancelBtn = feedbackPanel.find('#cancel_btn');
	let doc = $(document);

	let successColor = '#38BF33';
	let normalColor = '#000';
	let failureColor = '#F00';

	cancelBtn.on('click', () => { doc.trigger('cancel-playback'); });

	closeBtn.on('click', () => { feedbackPanel.hide(); });

	doc.on('playback-play-start', (e, data) => {
		testName.text(data.name);
		stepName.css('color', normalColor);
		stepsDone.css('color', normalColor);
		closeBtn.attr('disabled', 'disabled');
		cancelBtn.removeAttr('disabled');
		stepsDone.text(0);
		stepsTotal.text(data.totalActionCount);
		stepName.text(' ');
		feedbackPanel.show();
	});

	doc.on('playback-play-next-action', (e, data) => {
		stepsDone.text(data.performedActionCount);
		stepName.text(data.actionHumanName);
	});

	doc.on('playback-play-stop', (e, data) => {
		if (!data.cancelled) showFeedback(data.success);
		closeBtn.removeAttr('disabled');
		cancelBtn.attr('disabled', 'disabled');
	});

	function showFeedback(success) {
		if (success) {
			stepName.css('color', successColor);
			stepsDone.css('color', successColor);
			stepName.text('Test läbiti edukalt!');
		} else {
			stepName.css('color', failureColor);
			stepsDone.css('color', failureColor);
		}
	}
});
