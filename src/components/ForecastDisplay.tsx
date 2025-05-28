
import React from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { formatTemperature, getWeatherIcon } from '../utils/weatherUtils';

const ForecastDisplay = () => {
  const { state } = useWeather();

  if (!state.forecast) {
    return null;
  }

  // Get daily forecast (one entry per day at noon)
  const dailyForecasts = state.forecast.list.filter((item, index) => 
    index % 8 === 0 // Every 8th item (3-hour intervals, so every 24 hours)
  ).slice(0, 5);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">5-Day Forecast</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dailyForecasts.map((forecast, index) => {
          const date = new Date(forecast.dt * 1000);
          const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
          const temp = formatTemperature(forecast.main.temp, state.unit);
          
          return (
            <div key={forecast.dt} className="bg-white/10 rounded-xl p-4 text-center text-white">
              <p className="font-semibold mb-2">{dayName}</p>
              <div className="text-3xl mb-2">
                {getWeatherIcon(forecast.weather[0].icon)}
              </div>
              <p className="text-lg font-bold mb-1">{temp}</p>
              <p className="text-xs text-white/80 capitalize">
                {forecast.weather[0].description}
              </p>
              <div className="mt-2 flex justify-between text-xs text-white/70">
                <span>💧 {forecast.main.humidity}%</span>
                <span>💨 {Math.round(forecast.wind.speed)}m/s</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastDisplay;
