
import { useCallback } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import type { WeatherData, ForecastData } from '../contexts/WeatherContext';

const API_KEY = 'demo_key'; // In a real app, this would be from environment variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const useWeatherAPI = () => {
  const { state, dispatch } = useWeather();

  const fetchWeatherData = useCallback(async (cityName: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      console.log(`Fetching weather data for ${cityName}...`);
      
      // Simulate API call with mock data for demo purposes
      // In a real app, uncomment the actual API calls below
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

      // Mock current weather data
      const mockWeatherData: WeatherData = {
        id: 2643743,
        main: {
          temp: state.unit === 'metric' ? 22 : 72,
          feels_like: state.unit === 'metric' ? 24 : 75,
          humidity: 65,
          pressure: 1013,
        },
        weather: [{
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        }],
        wind: {
          speed: 3.5,
          deg: 230,
        },
        name: cityName,
        sys: {
          country: 'GB',
          sunrise: 1640149200,
          sunset: 1640181600,
        },
        dt: Math.floor(Date.now() / 1000),
      };

      // Mock forecast data
      const mockForecastData: ForecastData = {
        list: Array.from({ length: 40 }, (_, i) => ({
          dt: Math.floor(Date.now() / 1000) + (i * 3 * 60 * 60),
          main: {
            temp: state.unit === 'metric' ? 20 + Math.random() * 10 : 68 + Math.random() * 18,
            humidity: 60 + Math.random() * 20,
          },
          weather: [{
            id: 800,
            main: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
            description: ['clear sky', 'few clouds', 'light rain'][Math.floor(Math.random() * 3)],
            icon: ['01d', '02d', '10d'][Math.floor(Math.random() * 3)],
          }],
          wind: {
            speed: 2 + Math.random() * 5,
          },
          dt_txt: new Date(Date.now() + (i * 3 * 60 * 60 * 1000)).toISOString(),
        })),
        city: {
          name: cityName,
          country: 'GB',
        },
      };

      /* 
      // Actual API calls (uncomment when using real API key):
      
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=${state.unit}`),
        fetch(`${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=${state.unit}`)
      ]);

      if (!weatherResponse.ok) {
        throw new Error(weatherResponse.status === 404 ? 'City not found' : 'Failed to fetch weather data');
      }

      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast data');
      }

      const weatherData: WeatherData = await weatherResponse.json();
      const forecastData: ForecastData = await forecastResponse.json();
      */

      dispatch({ type: 'SET_CURRENT_WEATHER', payload: mockWeatherData });
      dispatch({ type: 'SET_FORECAST', payload: mockForecastData });
      dispatch({ type: 'SET_LAST_SEARCHED_CITY', payload: cityName });

      console.log('Weather data fetched successfully');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, [state.unit, dispatch]);

  return { fetchWeatherData };
};
