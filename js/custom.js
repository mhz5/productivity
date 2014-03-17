$(document).ready(function() {
	var workStart, lazyStart;		// Start times for timers.
	var timeDiff = 0.0;					// Time to display (difference between now and start)
	var workTimeout, lazyTimeout;	// timeout function IDs

	var storage = chrome.storage.local;

	storage.set({work:0.0, lazy:0.0}, function() {});

	$('#work').click(function() {
		end('lazy');
		start('work');
	});

	$('#lazy').click(function() {
		end('work');
		start('lazy');
	});

	$('#reset').click(function() {
		reset();
	});

	
	function start(timer) {
		$('#work-ratio').css('width', '30%');
		console.log('start ' + timer);
		startTime = new Date().getTime();
		incTimer(timer);
	}

	function end(timer) {
		console.log('end ' + timer);

		if (timer === 'work') {
			storage.set({work: timeDiff}, function() {
			});
			clearTimeout(workTimeout);
		}
		else {
			storage.set({lazy: timeDiff}, function() {
			});
			clearTimeout(lazyTimeout);
		}

	}
	function reset() {
		
		console.log('reset');
		workStart = null;
		lazyStart = null;
		clearTimeout(workTimeout);
		clearTimeout(lazyTimeout);
		$('#work-timer').html("0.00");
		$('#lazy-timer').html("0.00");
		storage.set({work:0.0, lazy:0.0}, function() {});

	}

// RETRIEVE PREVIOUS TIME FROM THE DIV!!!

function incTimer(timer) {
	var timeoutID = window.setTimeout(function() {
			storage.get(timer, function(item) {
				if (timer === 'work')
					timeDiff = new Date().getTime() - startTime + item.work;
				else
					timeDiff = new Date().getTime() - startTime + item.lazy;
			});
			
			console.log(timeDiff);
			
			var elapsed = Math.floor(timeDiff / 10) / 100;	// Formatting
			$('#' + timer + '-timer').html(elapsed);
			
			incTimer(timer);	// Recursively call function to continue timing.

		}, 10);

	if (timer === 'work')
		workTimeout = timeoutID;
	else
		lazyTimeout = timeoutID;

}
});
