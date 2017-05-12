// 
var tempState = 'F';
var temperature = 0;
var data;

console.clear();

function kelvinToF (degreesKelvin) {
	return (9/5) * degreesKelvin - 459.67;
}

function kelvinToC (degreesKelvin) {
	return degreesKelvin - 273.15;
}

function toggleTempType() {
	if (tempState === 'C') {
		temperature = kelvinToF(data.main.temp);
		tempState = 'F';
	} else {
		temperature = kelvinToC(data.main.temp);
		tempState = 'C';
	}

	updateTemp();
}

function updateTemp() {
		document.querySelector('#temp').innerHTML = temperature.toFixed(0);
		document.querySelector('#degreeType').innerHTML = tempState;
}

//creating the request to send the server
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
	//4 means we recieved the response
	if (xhr.readyState === 4) {
		data = JSON.parse(xhr.responseText);

		document.querySelector('#weather-main').innerHTML = data.weather[0].main;
		document.querySelector('#weather-details').innerHTML = data.weather[0].description;

		let icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
		document.querySelector('#weather-icon').src = icon;

		document.getElementById('ajax').innerHTML = JSON.stringify(data, null, 4);

		temperature = kelvinToF(data.main.temp);
		updateTemp();
	}
};
xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=75093&appid=bcc318753fc77300a6a78da4d915f6bd');
xhr.send();

console.log(xhr);
