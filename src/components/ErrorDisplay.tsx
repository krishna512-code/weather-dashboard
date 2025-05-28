
import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';

const ErrorDisplay = () => {
  const { state, dispatch } = useWeather();

  if (!state.error) {
    return null;
  }

  return (
    <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 mr-3 text-red-300" />
          <div>
            <h4 className="font-semibold">Error</h4>
            <p className="text-sm text-white/90">{state.error}</p>
          </div>
        </div>
        <button
          onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
