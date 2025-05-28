
import React from 'react';
import { useWeather } from '../contexts/WeatherContext';

const UnitToggle = () => {
  const { state, dispatch } = useWeather();

  const toggleUnit = () => {
    const newUnit = state.unit === 'metric' ? 'imperial' : 'metric';
    dispatch({ type: 'SET_UNIT', payload: newUnit });
  };

  return (
    <button
      onClick={toggleUnit}
      className="bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 px-4 py-3 rounded-xl text-white font-medium transition-all duration-200 min-w-fit"
    >
      {state.unit === 'metric' ? '°C' : '°F'}
    </button>
  );
};

export default UnitToggle;
