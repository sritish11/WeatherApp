# 🌦️ Atmos Weather

A modern, responsive weather dashboard built with **HTML, CSS and JavaScript**. Get real-time weather information, explore five-day forecasts and check weather conditions for any city around the world.

## ✨ Features

- **Current Weather:** View real-time temperature, weather conditions and location details.
- **Five-Day Forecast:** Explore upcoming weather conditions with daily temperature ranges.
- **City Search:** Search weather information for cities worldwide.
- **Current Location:** Get weather updates based on your device's location.
- **Weather Details:** View humidity, wind speed, pressure, visibility and other weather metrics.
- **Recent Searches:** Quickly revisit previously searched cities.
- **Dynamic UI:** Weather-themed interface with a dark, modern design.
- **Responsive Design:** Optimized for desktop, tablet and mobile screens.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| JavaScript (ES6+) | Application logic and API integration |
| Axios | HTTP requests |
| OpenWeatherMap API | Real-time weather and forecast data |
| LocalStorage | Persisting recent searches |

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/atmos-weather.git
```

### 2. Navigate to the project directory

```bash
cd atmos-weather
```

### 3. Configure the API key

Create a free API key at [OpenWeatherMap](https://openweathermap.org/api).

Add your API key to your local configuration file.

```js
export const API_KEY = 'YOUR_API_KEY';
```

Refer to `config.example.js` for the required configuration format.

### 4. Run the application

Open the project using **VS Code Live Server**.

Alternatively, use any local development server that supports JavaScript ES modules.

## 🌐 API Used

This project uses the [OpenWeatherMap API](https://openweathermap.org/api) to retrieve:

- Current weather information
- Five-day weather forecasts

## 📁 Project Structure

```text
atmos-weather/
│
├── css/
│   └── style.css
│
├── js/
│   ├── config.example.js
│   ├── weather.js
│   ├── forecast.js
│   ├── ui.js
│   └── main.js
│
├── screenshots/
│   ├── dashboard.png
│   └── weather-search.png
│
├── index.html
├── .gitignore
└── README.md
```

## 🔐 Security

API keys should not be committed to the repository.

Keep your personal configuration file private and use the provided example configuration as a template.

For production deployment, API requests should ideally be handled through a backend to protect API credentials.

## 👨‍💻 Author

**Ritish Acharya**

[GitHub](https://github.com/sritish11)

---

⭐ If you like this project, consider giving it a star!
