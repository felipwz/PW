const form = document.querySelector('form');
const weatherInfo = document.querySelector('#weather-info');

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	const cidade = form.cidade.value;
	try {
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=c4ef5a389dc10a541f7779d3a024cc67&units=metric`);
		if (!response.ok) {
			throw new Error('Não foi possível obter as informações meteorológicas desta cidade ou nome da cidade incorreto!');
		}
		const data = await response.json();
		const { name, main: { temp, humidity }, weather: [ { description } ] } = data;
		weatherInfo.innerHTML = `
			<h2>Informações meteorológicas de ${name}</h2>
			<p>Temperatura: ${temp}°C</p>
			<p>Umidade: ${humidity}%</p>
			<p>Descrição: ${description}</p>
		`;
	} catch (error) {
		weatherInfo.innerHTML = '';
		const errorElement = document.createElement('p');
		errorElement.id = 'error';
		errorElement.textContent = error.message;
		weatherInfo.appendChild(errorElement);
	}
});





  AOS.init();


