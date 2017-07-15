const weatherApp = {

	data: null,
	dewpoint: 0,
	distanceUnitsLg: `mi`,
	distanceUnitsMed: `ft`,
	distanceUnitsSm: `in`,

	elements: {
		conditions: document.getElementsByClassName(`conditions`),
		currentIcon: document.getElementsByClassName(`currentWeatherIcon`),
		currentTemp: document.getElementsByClassName(`currentDegrees`),
		degreeType: document.getElementsByClassName(`degreeType`),
		dewpoint: document.getElementsByClassName(`dewpoint`),
		elevation: document.getElementsByClassName(`elevation`),
		feelslike: document.getElementsByClassName(`feelslike`),
		head: document.getElementsByTagName(`head`),
		humidity: document.getElementsByClassName(`humidity`),
		latitude: document.getElementsByClassName(`latitude`),
		locale: document.getElementsByClassName(`locale`),
		location: document.getElementsByClassName(`location`),
		longitude: document.getElementsByClassName(`longitude`),
		precipitation: document.getElementsByClassName(`precipitation`),
		pressure: document.getElementsByClassName(`pressure`),
		title: document.getElementsByTagName(`title`),
		visibility: document.getElementsByClassName(`visibility`),
		weatherScript: document.createElement(`script`),
		wind: document.getElementsByClassName(`wind`),
		windchill: document.getElementsByClassName(`windchill`),
	},

	elevation: 0,
	feelslike: 0,

	getWeather() {
		const cacheBusterNum = 999999;
		const searchTerms = document.querySelector(`[name="searchBox"]`).value;

		const apiBaseUrl = `https://api.wunderground.com/api`;
		const apiKey = `6b31203be6673bed`;
		const apiFeatures = `conditions`;
		const query = searchTerms || `autoip`;
		const apiRequestId = `requestId=${Math.floor(Math.random() * cacheBusterNum).toString()}`; // 'cache-buster'

		const apiFinalUrl = `${apiBaseUrl}/${apiKey}/${apiFeatures}/q/${query}.json?${apiRequestId}`;

		return fetch(apiFinalUrl)
			.then((data)=> {
				return data.json();
			});
	},

	precipitation: 0,
	pressure: 0,
	pressureUnits: `in`,

	setWeather() {
		weatherApp.getWeather()
			.then((data)=> {
				const tags = weatherApp.elements;

				const iconUrlSwitch = new RegExp(/[a-z]{1}\/([^/]*$)/, ``);
				const dataStart = data.current_observation;
				const iconUrl = `${dataStart.icon_url
					.replace(iconUrlSwitch, `i/$1`)}`;

				weatherApp.data = data;

				tags.conditions[0].innerHTML = `Conditions: ${dataStart.weather}`;
				tags.currentIcon[0].src = `${iconUrl}`;
				tags.humidity[0].innerHTML = `Humidity: ${dataStart.relative_humidity}`;
				tags.latitude[0].innerHTML = `Latitude: ${Number(dataStart.display_location.latitude).toFixed(2)}`;
				tags.location[0].innerHTML = `${dataStart.display_location.full}`;
				tags.longitude[0].innerHTML = `Longitude: ${Number(dataStart.display_location.longitude).toFixed(2)}`;
				tags.title[0].innerHTML = `WeatherApp - ${dataStart.display_location.full}`;

				if (this.temperatureUnits !== `C`) {
					tags.currentTemp[0].innerHTML = `${Number(dataStart.temp_f).toFixed()} °F`;
					tags.dewpoint[0].innerHTML = `Dewpoint: ${dataStart.dewpoint_f} °F`;
					tags.elevation[0].innerHTML = `Elevation: ${Number(dataStart.display_location.elevation * 3.28084).toFixed()} ${weatherApp.distanceUnitsMed}`;
					tags.feelslike[0].innerHTML = `Feels Like: ${Number(dataStart.feelslike_f).toFixed()} °F`;
					tags.precipitation[0].innerHTML = `Precipitation: ${dataStart.precip_today_in} ${weatherApp.distanceUnitsSm}`;
					tags.pressure[0].innerHTML = `Pressure: ${dataStart.pressure_in} ${weatherApp.pressureUnits}`;
					tags.visibility[0].innerHTML = `Visibility: ${dataStart.visibility_mi} ${weatherApp.distanceUnitsLg}`;
					tags.wind[0].innerHTML = `Wind: ${dataStart.wind_dir}, ${dataStart.wind_mph} ${weatherApp.speedUnits}`;
					tags.windchill[0].innerHTML = `Wind Chill: ${dataStart.windchill_f} °F`;
				} else {
					tags.currentTemp[0].innerHTML = `${Number(dataStart.temp_c).toFixed()} °C`;
					tags.dewpoint[0].innerHTML = `Dewpoint: ${dataStart.dewpoint_c} °C`;
					tags.elevation[0].innerHTML = `↑ Elevation: ${Number(dataStart.display_location.elevation).toFixed()} ${weatherApp.distanceUnitsMed}`;
					tags.feelslike[0].innerHTML = `Feels Like: ${Number(dataStart.feelslike_c).toFixed()} °C`;
					tags.precipitation[0].innerHTML = `Precipitation: ${dataStart.precip_today_metric} ${weatherApp.distanceUnitsSm}`;
					tags.pressure[0].innerHTML = `Pressure: ${dataStart.pressure_mb} ${weatherApp.pressureUnits}`;
					tags.visibility[0].innerHTML = `Visibility: ${dataStart.visibility_km} ${weatherApp.distanceUnitsLg}`;
					tags.wind[0].innerHTML = `Wind: ${dataStart.wind_dir}, ${dataStart.wind_kph} ${weatherApp.speedUnits}`;
					tags.windchill[0].innerHTML = `Wind Chill: ${dataStart.windchill_c} °C`;
				}
			});
	},

	speedUnits: `mph`,
	temperature: 0,
	temperatureUnits: `F`,

	toggleTempType() {
		const convert = document.querySelector(`.convert`);
		const dataStart = this.data.current_observation;

		if (this.temperatureUnits !== `C`) {
			this.dewpoint = `${dataStart.dewpoint_c} °C`;
			this.distanceUnitsLg = `km`;
			this.distanceUnitsMed = `m`;
			this.distanceUnitsSm = `cm`;
			this.elevation = `${Number(dataStart.display_location.elevation).toFixed()}`;
			this.feelslike = `${Number(dataStart.feelslike_c).toFixed()} °C`;
			this.precipitation = dataStart.precip_today_metric;
			this.pressure = dataStart.pressure_mb;
			this.pressureUnits = `mb`;
			this.speedUnits = `kph`;
			this.temperature = `${Number(dataStart.temp_c).toFixed()} °C`;
			this.temperatureUnits = `C`;
			this.visibility = dataStart.visibility_km;
			this.wind = dataStart.wind_kph;
			this.windchill = `${dataStart.windchill_c} °C`;
			convert.innerHTML = `Convert to &deg;F (Emperial)`;
		} else {
			this.dewpoint = `${dataStart.dewpoint_f} °F`;
			this.distanceUnitsLg = `mi`;
			this.distanceUnitsMed = `ft`;
			this.distanceUnitsSm = `in`;
			this.elevation = `${Number(dataStart.display_location.elevation * 3.28084).toFixed()}`;
			this.feelslike = `${Number(dataStart.feelslike_f).toFixed()} °F`;
			this.precipitation = dataStart.precip_today_in;
			this.pressure = dataStart.pressure_in;
			this.pressureUnits = `in`;
			this.speedUnits = `mph`;
			this.temperature = `${Number(dataStart.temp_f).toFixed()} °F`;
			this.temperatureUnits = `F`;
			this.visibility = dataStart.visibility_mi;
			this.wind = dataStart.wind_mph;
			this.windchill = `${dataStart.windchill_f} °F`;
			convert.innerHTML = `Convert to &deg;C (Metric)`;
		}

		this.updateTemp();
	},

	updateTemp() {
		const dataStart = this.data.current_observation;
		const tags = weatherApp.elements;

		tags.currentTemp[0].innerHTML = this.temperature;
		tags.dewpoint[0].innerHTML = `Dewpoint: ${this.dewpoint}`;
		tags.elevation[0].innerHTML = `↑ Elevation: ${this.elevation} ${weatherApp.distanceUnitsMed}`;
		tags.feelslike[0].innerHTML = `Feels Like: ${this.feelslike}`;
		tags.precipitation[0].innerHTML = `Precipitation: ${this.precipitation} ${weatherApp.distanceUnitsSm}`;
		tags.pressure[0].innerHTML = `Pressure: ${this.pressure} ${weatherApp.pressureUnits}`;
		tags.visibility[0].innerHTML = `Visibility: ${this.visibility} ${weatherApp.distanceUnitsLg}`;
		tags.wind[0].innerHTML = `Wind: ${dataStart.wind_dir}, ${this.wind} ${weatherApp.speedUnits}`;
		tags.windchill[0].innerHTML = `Wind Chill: ${this.windchill}`;

		// Array.from(tags.degreeType).forEach((index)=> {
		// 	index.innerHTML = this.temperatureUnits;
		// });
	},

	visibility: 0,
	wind: 0,
	windchill: 0,
};

window.onload = weatherApp.setWeather;

// console.clear();


// promise / fetch
// async

// study practice build refactor repeat

// search sort big-O-notation
