
import {
    API_KEY,
    WEATHER_URL
} from './config.js';


// Fetch weather using city name

export async function getWeatherByCity(city) {

    try {

        const response = await axios.get(WEATHER_URL, {

            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }

        });

        return response.data;

    }

    catch (error) {

        throw error;

    }

}


// Fetch weather using coordinates

export async function getWeatherByCoordinates(lat, lon) {

    try {

        const response = await axios.get(WEATHER_URL, {

            params: {
                lat: lat,
                lon: lon,
                appid: API_KEY,
                units: 'metric'
            }

        });

        return response.data;

    }

    catch (error) {

        throw error;

    }

}
