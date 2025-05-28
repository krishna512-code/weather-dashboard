
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface WeatherData {
  id: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  country?: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
  unit: 'metric' | 'imperial';
  lastSearchedCity: string;
}

type WeatherAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CURRENT_WEATHER'; payload: WeatherData }
  | { type: 'SET_FORECAST'; payload: ForecastData }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_UNIT'; payload: 'metric' | 'imperial' }
  | { type: 'SET_LAST_SEARCHED_CITY'; payload: string };

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
  unit: 'metric',
  lastSearchedCity: localStorage.getItem('lastSearchedCity') || 'London',
};

const weatherReducer = (state: WeatherState, action: WeatherAction): WeatherState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CURRENT_WEATHER':
      return { ...state, currentWeather: action.payload, loading: false, error: null };
    case 'SET_FORECAST':
      return { ...state, forecast: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_UNIT':
      localStorage.setItem('temperatureUnit', action.payload);
      return { ...state, unit: action.payload };
    case 'SET_LAST_SEARCHED_CITY':
      localStorage.setItem('lastSearchedCity', action.payload);
      return { ...state, lastSearchedCity: action.payload };
    default:
      return state;
  }
};

const WeatherContext = createContext<{
  state: WeatherState;
  dispatch: React.Dispatch<WeatherAction>;
} | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, {
    ...initialState,
    unit: (localStorage.getItem('temperatureUnit') as 'metric' | 'imperial') || 'metric',
  });

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
