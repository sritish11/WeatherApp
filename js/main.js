
import {
    getWeatherByCity,
    getWeatherByCoordinates
} from './weather.js';

import {
    getForecast,
    organizeForecast
} from './forecast.js';

import {
    renderWeather,
    renderForecast,
    setLoading,
    showError,
    showForecastError,
    saveRecentSearch,
    renderHistory,
    clearDashboard
} from './ui.js';


const cityInput = document.getElementById('cityInput');

const searchBtn = document.getElementById('searchBtn');

const locationBtn = document.getElementById('locationBtn');


// Search weather by city

async function searchWeather(city) {

    city = city.trim();

    if (!city) {

        showError('Please enter a city name.');

        return;

    }


    setLoading(true);

    clearDashboard();

    showError('');


    try {

        // Fetch current weather

        const weather = await getWeatherByCity(city);


        // Display current weather

        renderWeather(weather);


        // Save city in recent searches

        saveRecentSearch(weather.name);


        // Fetch forecast using coordinates

        try {

            const forecastData = await getForecast(
                weather.coord.lat,
                weather.coord.lon
            );

            const dailyForecast =
                organizeForecast(forecastData);

            renderForecast(dailyForecast);

        }

        catch (forecastError) {

            console.error('Forecast error:', forecastError);

            showForecastError(
                'Unable to load the five-day forecast.'
            );

        }

    }

    catch (error) {

        console.error('Weather error:', error);

        if (error.response?.status === 404) {

            showError('City not found. Please check the spelling.');

        }

        else if (error.response?.status === 401) {

            showError('Invalid API key. Please check your configuration.');

        }

        else if (!error.response) {

            showError('Network error. Please check your internet connection.');

        }

        else {

            showError('Something went wrong. Please try again.');

        }

    }

    finally {

        setLoading(false);

    }

}


// Search using current location

async function getMyLocation() {

    if (!navigator.geolocation) {

        showError('Geolocation is not supported by your browser.');

        return;

    }


    setLoading(true);

    clearDashboard();

    showError('');


    navigator.geolocation.getCurrentPosition(

        async position => {

            try {

                const { latitude, longitude } =
                    position.coords;


                const weather =
                    await getWeatherByCoordinates(
                        latitude,
                        longitude
                    );


                renderWeather(weather);

                saveRecentSearch(weather.name);


                // Fetch forecast

                try {

                    const forecastData = await getForecast(
                        latitude,
                        longitude
                    );

                    renderForecast(
                        organizeForecast(forecastData)
                    );

                }

                catch (error) {

                    console.error(error);

                    showForecastError(
                        'Unable to load the five-day forecast.'
                    );

                }

            }

            catch (error) {

                console.error(error);

                showError(
                    'Unable to fetch weather for your location.'
                );

            }

            finally {

                setLoading(false);

            }

        },

        error => {

            setLoading(false);

            if (error.code === 1) {

                showError('Location permission was denied.');

            }

            else if (error.code === 2) {

                showError('Your location is currently unavailable.');

            }

            else {

                showError('Location request timed out.');

            }

        },

        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000
        }

    );

}


// Search button

searchBtn.addEventListener('click', () => {

    searchWeather(cityInput.value);

});


// Enter key

cityInput.addEventListener('keydown', event => {

    if (event.key === 'Enter') {

        searchWeather(cityInput.value);

    }

});


// Current location button

locationBtn.addEventListener('click', getMyLocation);


// Recent search clicks

document.addEventListener('historySearch', event => {

    cityInput.value = event.detail;

    searchWeather(event.detail);

});


// Initial setup

renderHistory();
