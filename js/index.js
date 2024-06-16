const page_wrapper = document.getElementById('page_wrapper');
const activity_button = document.getElementById('activity_button');
const map_button = document.getElementById('map_button');
const timer_button = document.getElementById('timer_button');

const urlRoutes = {
	'/': { title: 'Resume', template: './templates/main.html' },
	'/map': { title: 'Map', template: './templates/map.html' },
	'/timer': { title: 'Timer', template: './templates/time.html' },
	'/404': { title: 'Not Found', template: './templates/notFound.html' },
};

activity_button.onclick = () => handleNavigation('/');
map_button.onclick = () => handleNavigation('/map');
timer_button.onclick = () => handleNavigation('/timer');

const executeScripts = () => {
	const scripts = page_wrapper.querySelectorAll('script');
	scripts.forEach(script => {
		const newScript = document.createElement('script');
		if (script.src) {
			newScript.src = script.src;
			newScript.defer = script.defer;
		} else {
			newScript.innerHTML = script.innerHTML;
		}
		document.body.appendChild(newScript).parentNode.removeChild(newScript);
	});
};

const getFullPath = path => {
	const isGithubPages =
		window.location.hostname.split('.').slice(-2, -1)[0] === 'github';
	const basePath = isGithubPages
		? `/${window.location.pathname.split('/')[1]}`
		: '';
	const origin = window.location.origin + basePath;
	return origin + path;
};

const handleNavigation = route => {
	window.history.pushState(route, '', getFullPath(route));
	urlLocationHandler(route);
};

const urlLocationHandler = async route => {
	const currentRoute = urlRoutes[route];

	const html = await fetch(currentRoute.template).then(res => res.text());
	page_wrapper.innerHTML = html;
	document.title = currentRoute.title;
	executeScripts();
};

window.onload = () => {
	const currentTime = new Date().getTime();
	document.cookie = `visitTime=${currentTime}; path=/`;
};
