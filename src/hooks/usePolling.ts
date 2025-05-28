
import { useEffect, useRef } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { useWeatherAPI } from './useWeatherAPI';

export const usePolling = () => {
  const { state } = useWeather();
  const { fetchWeatherData } = useWeatherAPI();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up polling only if we have a last searched city
    if (state.lastSearchedCity) {
      intervalRef.current = setInterval(() => {
        console.log('Polling: Refreshing weather data...');
        fetchWeatherData(state.lastSearchedCity);
      }, 30000); // 30 seconds

      console.log('Weather polling started (30 second intervals)');
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        console.log('Weather polling stopped');
      }
    };
  }, [state.lastSearchedCity, fetchWeatherData]);

  return intervalRef;
};
