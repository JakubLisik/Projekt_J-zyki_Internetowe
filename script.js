
    // const apiKey = '718a02d871f243ce8f96d8cfb76d2121';
 

    document.getElementById('weather-form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const city = document.getElementById('city').value;
        const unit = document.querySelector('input[name="unit"]:checked').value;
        const apiKey = '718a02d871f243ce8f96d8cfb76d2121';
    
        const currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}&units=${unit}&lang=pl`;
        const forecastWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}&units=${unit}&lang=pl&days=5`;
    
        fetch(currentWeatherUrl)
            .then(response => response.json())
            .then(data => {
                const weatherData = data.data[0];
                const currentWeatherResult = `
                    <h2>Aktualna pogoda w ${weatherData.city_name}</h2>
                    <img src="https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png" class="weather-icon">
                    <p>Temperatura: ${weatherData.temp} °${unit === 'M' ? 'C' : 'F'}</p>
                    <p>Opis: ${weatherData.weather.description}</p>
                    <p>Wilgotność: ${weatherData.rh} %</p>
                    <p>Wiatr: ${weatherData.wind_spd} ${unit === 'M' ? 'm/s' : 'mph'}</p>
                `;
                document.getElementById('current-weather').innerHTML = currentWeatherResult;
            })
            .catch(error => {
                console.error('Błąd:', error);
                document.getElementById('current-weather').innerHTML = '<p>Nie udało się pobrać danych o aktualnej pogodzie.</p>';
            });
    
        fetch(forecastWeatherUrl)
            .then(response => response.json())
            .then(data => {
                const forecastData = data.data;
                let forecastWeatherResult = '<h2>Prognoza na 5 dni</h2>';
                forecastData.forEach(day => {
                    forecastWeatherResult += `
                        <div class="forecast-day">
                            <p>${new Date(day.valid_date).toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                            <img src="https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png" class="weather-icon">
                            <p>${day.temp} °${unit === 'M' ? 'C' : 'F'}</p>
                        </div>
                    `;
                });
                document.getElementById('forecast-weather').innerHTML = forecastWeatherResult;
            })
            .catch(error => {
                console.error('Błąd:', error);
                document.getElementById('forecast-weather').innerHTML = '<p>Nie udało się pobrać danych o prognozie pogody.</p>';
            });
    });
    
