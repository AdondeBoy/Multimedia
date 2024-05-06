const apiKeyWeather = '1ff240de287dae93a6e61f1f4a04bf0a';
// https://api.openweathermap.org/data/2.5/weather?q=Palma+de+Mallorca&appid=1ff240de287dae93a6e61f1f4a04bf0a&units=metric
const apiUrlWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=39.56751097483424&lon=2.648302373075007&appid=${apiKeyWeather}&units=metric`;
//const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Palma+de+Mallorca&appid=${apiKey}&units=metric`;
fetch(apiUrl)
 .then(response => response.json())
 .then(data => {
 console.log(data);
 const temperature = data.main.temp;
 const description = data.weather[0].description;
 console.log(`La temperatura en Mallorca es de ${temperature} grados Celsius. ${description}`);
 })
 .catch(error => console.error(error));