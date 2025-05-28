
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { useWeatherAPI } from '../hooks/useWeatherAPI';

const SearchInput = () => {
  const [city, setCity] = useState('');
  const { state } = useWeather();
  const { fetchWeatherData } = useWeatherAPI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city.trim());
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-md">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
          disabled={state.loading}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
        <button
          type="submit"
          disabled={state.loading || !city.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 rounded-lg text-white text-sm font-medium transition-all duration-200"
        >
          {state.loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
