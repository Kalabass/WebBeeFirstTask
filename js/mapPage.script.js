function initMap() {
	const centerMap = { lat: 56.7428998, lng: 37.0992793 };

	const mapOptions = {
		center: centerMap,
		zoom: 10,
	};

	const map = new google.maps.Map(
		document.getElementById('google-map'),
		mapOptions
	);
	setTimeout(() => {
		preloader.remove();
		document.getElementById('google-map').style.display = 'block';
	}, 1000);
}
