
import {
    API_KEY,
    FORECAST_URL
} from './config.js';


// Fetch 5-day forecast

export async function getForecast(lat, lon) {

    try {

        const response = await axios.get(FORECAST_URL, {

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


// Group 3-hour forecast data into daily data

export function organizeForecast(data) {

    const timezone = data.city.timezone;

    const dailyData = {};

    data.list.forEach(item => {

        // Convert timestamp to city's local date

        const localDate = new Date(
            (item.dt + timezone) * 1000
        ).toISOString().slice(0, 10);


        // Create date group if it doesn't exist

        if (!dailyData[localDate]) {

            dailyData[localDate] = {

                temperatures: [],
                entries: [],
                rainProbability: 0

            };

        }


        // Store temperatures

        dailyData[localDate].temperatures.push(
            item.main.temp_min,
            item.main.temp_max
        );


        // Store complete forecast entry

        dailyData[localDate].entries.push(item);


        // Store highest rain probability

        dailyData[localDate].rainProbability = Math.max(
            dailyData[localDate].rainProbability,
            item.pop || 0
        );

    });


    // Get next five available calendar days

    return Object.keys(dailyData)

        .sort()

        .slice(0, 5)

        .map(date => {

            const day = dailyData[date];


            // Find forecast closest to 12 PM

            const midday = day.entries.reduce(
                (closest, current) => {

                    const currentHour = new Date(
                        (current.dt + timezone) * 1000
                    ).getUTCHours();

                    const closestHour = new Date(
                        (closest.dt + timezone) * 1000
                    ).getUTCHours();


                    return Math.abs(currentHour - 12) <
                        Math.abs(closestHour - 12)
                        ? current
                        : closest;

                }
            );


            return {

                date: date,

                minTemp: Math.round(
                    Math.min(...day.temperatures)
                ),

                maxTemp: Math.round(
                    Math.max(...day.temperatures)
                ),

                weather: midday.weather[0],

                rainProbability: Math.round(
                    day.rainProbability * 100
                )

            };

        });

}
