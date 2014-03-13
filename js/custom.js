$(document).ready(function() {
	var startTime;
	var timeoutID;

	$('#start').click(function() {
		start();
	});

	$('#end').click(function() {
		end();
	});

	$('#reset').click(function() {
		reset();
	});

	
	function start() {
		console.log('start');
		startTime = new Date().getTime();
		incTimer();
	}

	function end() {
		console.log('end');
		clearTimeout(timeoutID);	// Stop timer
	}
	function reset() {
		console.log('reset');
		startTime = null;
		clearTimeout(timeoutID);	// Stop timer
	}

	function incTimer() {
		timeoutID = window.setTimeout(function() {
			var timeDiff = new Date().getTime() - startTime;	// time difference
			console.log(time);
			var elapsed = Math.floor(timeDiff / 10) / 100;	// Formatting
			$('#work-timer').html(elapsed);
			
			incTimer();	// Recursively call function to continue timing.

		}, 10);
	}
});
