const route = window.location.pathname.split('/').at(-1);

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

window.location = getFullPath('');
handleNavigation(route);
