
const $ = id => document.getElementById(id);


// Convert timestamp to city's local time

function formatTime(timestamp, timezone) {

    const date = new Date(
        (timestamp + timezone) * 1000
    );

    return date.toLocaleTimeString('en-US', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

}


// Get wind direction

function getWindDirection(degrees) {

    const directions = [
        'N', 'NE', 'E', 'SE',
        'S', 'SW', 'W', 'NW'
    ];

    return directions[
        Math.round(degrees / 45) % 8
    ];

}


// Update background according to weather

export function updateTheme(info) {

    const condition = info.weather[0].main.toLowerCase();

    const isNight = info.weather[0].icon.endsWith('n');

    let theme = condition;

    if (isNight) {
        theme = 'night';
    }

    else if (condition === 'drizzle' || condition === 'thunderstorm') {
        theme = 'rain';
    }

    else if (condition === 'mist' ||
             condition === 'smoke' ||
             condition === 'haze' ||
             condition === 'dust' ||
             condition === 'fog' ||
             condition === 'sand' ||
             condition === 'ash') {

        theme = 'clouds';

    }

    const allowedThemes = [
        'clear', 'clouds', 'rain',
        'snow', 'night'
    ];

    document.body.dataset.weather =
        allowedThemes.includes(theme) ? theme : 'clouds';

}


// Render current weather

export function renderWeather(info) {

    $('cityName').textContent = info.name;

    $('currentDate').textContent =
        new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });


    // Temperature

    $('temperature').textContent =
        `${Math.round(info.main.temp)}°C`;

    $('feelsLike').textContent =
        `${Math.round(info.main.feels_like)}°C`;


    // Weather condition

    $('weatherDescription').textContent =
        info.weather[0].description;

    $('weatherSummary').textContent =
        `The weather in ${info.name} is currently ${info.weather[0].description}.`;


    // Weather icon

    $('weatherIcon').src =
        `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`;

    $('weatherIcon').alt =
        info.weather[0].description;


    // Weather details

    $('humidity').textContent =
        `${info.main.humidity}%`;

    $('windSpeed').textContent =
        `${info.wind.speed} m/s`;

    $('windDirection').textContent =
        `${getWindDirection(info.wind.deg)} direction`;

    $('pressure').textContent =
        `${info.main.pressure} hPa`;

    $('visibility').textContent =
        `${(info.visibility / 1000).toFixed(1)} km`;

    $('cloudiness').textContent =
        `${info.clouds.all}%`;


    // Coordinates and country

    $('coordinates').textContent =
        `${info.coord.lat.toFixed(2)}, ${info.coord.lon.toFixed(2)}`;

    $('country').textContent =
        info.sys.country;


    // Sunrise and sunset

    $('sunrise').textContent =
        formatTime(info.sys.sunrise, info.timezone);

    $('sunset').textContent =
        formatTime(info.sys.sunset, info.timezone);


    // Change background

    updateTheme(info);


    // Display dashboard

    $('weatherDashboard').classList.remove('hidden');

    $('emptyState').classList.add('hidden');

}


// Render five-day forecast

export function renderForecast(days) {

    const grid = $('forecastGrid');

    grid.replaceChildren();

    days.forEach((day, index) => {

        const date = new Date(`${day.date}T12:00:00Z`);

        const dayName = index === 0
            ? 'Today'
            : date.toLocaleDateString('en-US', {
                weekday: 'short',
                timeZone: 'UTC'
            });

        const dateLabel = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            timeZone: 'UTC'
        });


        const card = document.createElement('article');

        card.className = 'forecast-card';


        // Day

        const name = document.createElement('div');

        name.className = 'forecast-day';

        name.textContent = dayName;


        // Date

        const dateElement = document.createElement('div');

        dateElement.className = 'forecast-date';

        dateElement.textContent = dateLabel;


        // Weather icon

        const icon = document.createElement('img');

        icon.className = 'forecast-icon';

        icon.src =
            `https://openweathermap.org/img/wn/${day.weather.icon}.png`;

        icon.alt = day.weather.description;


        // Weather condition

        const condition = document.createElement('div');

        condition.className = 'forecast-condition';

        condition.textContent = day.weather.description;


        // Temperature

        const temperatures = document.createElement('div');

        temperatures.className = 'forecast-temps';

        const high = document.createElement('span');

        high.textContent = `${day.maxTemp}°`;

        const low = document.createElement('span');

        low.className = 'forecast-low';

        low.textContent = `${day.minTemp}°`;

        temperatures.append(high, low);


        // Rain probability

        const rain = document.createElement('div');

        rain.className = 'forecast-rain';

        rain.textContent =
            `☔ ${day.rainProbability}% rain`;


        // Add everything to card

        card.append(
            name,
            dateElement,
            icon,
            condition,
            temperatures,
            rain
        );

        grid.appendChild(card);

    });

}


// Loading state

export function setLoading(isLoading) {

    $('loader').classList.toggle('hidden', !isLoading);

    $('searchBtn').disabled = isLoading;

    $('locationBtn').disabled = isLoading;

    $('searchBtn').textContent =
        isLoading ? 'Searching...' : 'Search';

}


// Display error

export function showError(message) {

    $('errorMessage').textContent = message;

}


// Forecast error

export function showForecastError(message) {

    $('forecastMessage').textContent = message;

}


// Save recent searches

export function saveRecentSearch(city) {

    let history = JSON.parse(
        localStorage.getItem('weatherHistory') || '[]'
    );

    history = history.filter(
        item => item.toLowerCase() !== city.toLowerCase()
    );

    history.unshift(city);

    history = history.slice(0, 5);

    localStorage.setItem(
        'weatherHistory',
        JSON.stringify(history)
    );

    renderHistory();

}


// Display recent searches

export function renderHistory() {

    const historyList = $('historyList');

    historyList.replaceChildren();

    const history = JSON.parse(
        localStorage.getItem('weatherHistory') || '[]'
    );

    history.forEach(city => {

        const button = document.createElement('button');

        button.className = 'history-item';

        button.textContent = city;

        button.addEventListener('click', () => {

            document.dispatchEvent(
                new CustomEvent('historySearch', {
                    detail: city
                })
            );

        });

        historyList.appendChild(button);

    });

}


// Hide old dashboard when a new search starts

export function clearDashboard() {

    $('weatherDashboard').classList.add('hidden');

    $('emptyState').classList.add('hidden');

    $('forecastGrid').replaceChildren();

    $('forecastMessage').textContent = '';

}
