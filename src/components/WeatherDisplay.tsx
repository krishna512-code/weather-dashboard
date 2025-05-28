
import React from 'react';
import { Thermometer, Droplets, Wind, Eye } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { formatTemperature, getWeatherIcon } from '../utils/weatherUtils';

const WeatherDisplay = () => {
  const { state } = useWeather();

  if (state.loading) {
    return (
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white">Loading weather data...</p>
      </div>
    );
  }

  if (!state.currentWeather) {
    return null;
  }

  const weather = state.currentWeather;
  const temp = formatTemperature(weather.main.temp, state.unit);
  const feelsLike = formatTemperature(weather.main.feels_like, state.unit);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
          <p className="text-white/80 capitalize">{weather.weather[0].description}</p>
        </div>
        <div className="text-6xl">
          {getWeatherIcon(weather.weather[0].icon)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-center">
          <div className="text-4xl md:text-6xl font-bold mb-2">{temp}</div>
          <p className="text-white/80">Feels like {feelsLike}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-300" />
            <p className="text-sm text-white/80">Humidity</p>
            <p className="text-lg font-semibold">{weather.main.humidity}%</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 text-center">
            <Wind className="w-6 h-6 mx-auto mb-2 text-gray-300" />
            <p className="text-sm text-white/80">Wind Speed</p>
            <p className="text-lg font-semibold">
              {state.unit === 'metric' ? `${weather.wind.speed} m/s` : `${Math.round(weather.wind.speed * 2.237)} mph`}
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 text-center">
            <Thermometer className="w-6 h-6 mx-auto mb-2 text-red-300" />
            <p className="text-sm text-white/80">Pressure</p>
            <p className="text-lg font-semibold">{weather.main.pressure} hPa</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 text-center">
            <Eye className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
            <p className="text-sm text-white/80">Visibility</p>
            <p className="text-lg font-semibold">
              {state.unit === 'metric' ? '10 km' : '6.2 mi'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-white/60 text-center">
        Last updated: {new Date(weather.dt * 1000).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default WeatherDisplay;
