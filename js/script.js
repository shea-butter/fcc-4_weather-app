const weatherApp = {
	elements: {
		head: document.getElementsByTagName(`head`),
		icon0: document.getElementsByClassName(`day0-weatherIcon`),
		locale: document.getElementsByClassName(`locale`),
		temp0: document.getElementsByClassName(`day0-degrees`),
		title: document.getElementsByTagName(`title`),
		weatherScript: document.createElement(`script`),
	},

	getWeather() {
		const tags = weatherApp.elements;

		tags.weatherScript.requestId = Math.floor(Math.random() * 999999).toString(); // 'cache-buster'
		tags.weatherScript.type = `text/javascript`;
		tags.weatherScript.id = `weatherScript`;
		tags.weatherScript.src = `https://api.wunderground.com/api/6b31203be6673bed/conditions/forecast/q/32.85842710000001,97.12428799999999.json?requestId=${tags.weatherScript.requestId}&callback=weatherApp.setWeather`;

		tags.head[0].appendChild(tags.weatherScript);
	},

	setWeather(data) {
		const tags = weatherApp.elements;

		const iconUrlSwitch = new RegExp(/[a-z]{1}\/([^/]*$)/, ``);
		const iconUrl = `${data.current_observation.icon_url
				.replace(iconUrlSwitch, `i/$1`)}`;

		tags.head[0].removeChild(weatherScript); // remove script element

		tags.title[0].innerHTML = `WeatherApp - ${data.current_observation.display_location.full}`;

		tags.locale[0].getElementsByTagName(`h1`)[0].innerHTML = `${data.current_observation.display_location.full}`;
		tags.icon0[0].src = `${iconUrl}`;
		tags.temp0[0].innerHTML = `${data.current_observation.temp_f}`;

		// if (data[0].custom_meta) {
		// 	source[0].innerHTML = `	${data[0].custom_meta.Source}`; // set source content

		// 	sourceLink = source[0].getElementsByTagName(`a`);
		// 	sourceLink[0].target = `_blank`;
		// 	sourceLink[0].rel = `noopener noreferrer`;
		// }

		// window.formatTweet(data);
	},
};

window.onload = weatherApp.getWeather;
