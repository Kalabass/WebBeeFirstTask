function initTimer() {
	const visitTimeCookie = document.cookie
		.split(';')
		.find(cookie => cookie.trim().startsWith('visitTime='));
	if (visitTimeCookie) {
		const visitTime = parseInt(visitTimeCookie.split('=')[1]);
		const currentTime = new Date().getTime();
		const elapsedTime = currentTime - visitTime;

		startTimer(elapsedTime);
	}
}

function startTimer(elapsedTime) {
	const timerElement = document.getElementById('timer');
	let seconds = Math.floor(elapsedTime / 1000);

	function updateTimer() {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

		timerElement.textContent = formattedTime;

		seconds++;
	}
	setInterval(updateTimer, 1000);

	updateTimer();
}

initTimer();
