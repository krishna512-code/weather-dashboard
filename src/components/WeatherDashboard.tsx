import React, { useEffect } from 'react';
import { WeatherProvider } from '../contexts/WeatherContext';
import SearchInput from './SearchInput';
import WeatherDisplay from './WeatherDisplay';
import ForecastDisplay from './ForecastDisplay';
import ErrorDisplay from './ErrorDisplay';
import UnitToggle from './UnitToggle';
import { useWeatherAPI } from '../hooks/useWeatherAPI';
import { usePolling } from '../hooks/usePolling';

const WeatherDashboardContent = () => {
  const { fetchWeatherData } = useWeatherAPI();
  
  // Initialize polling - this will now work because we're inside the WeatherProvider
  usePolling();

  useEffect(() => {
    const lastCity = localStorage.getItem('lastSearchedCity') || 'London';
    fetchWeatherData(lastCity);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            Weather Dashboard
          </h1>
          <p className="text-white/80 text-lg">Real-time weather updates every 30 seconds</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <SearchInput />
              <UnitToggle />
            </div>
            
            <ErrorDisplay />
            <WeatherDisplay />
            <ForecastDisplay />
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Real-time weather updates
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  5-day weather forecast
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Temperature unit switching
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Local storage preferences
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeatherDashboard = () => {
  return (
    <WeatherProvider>
      <WeatherDashboardContent />
    </WeatherProvider>
  );
};

export default WeatherDashboard;
