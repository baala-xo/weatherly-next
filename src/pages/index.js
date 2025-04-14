'use client';

import React, { useState } from 'react';
import  NumberFlow from '@number-flow/react';

export default function Home() {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [condition, setCondition] = useState('');
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setError('');
    setTemperature(null);
    setCondition('');

    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch weather');

      const data = await response.json();
      const temp = data?.current?.temp_c;
      const weatherCondition = data?.current?.condition?.text;

      if (typeof temp === 'number') {
        setTemperature(temp);
        setCondition(weatherCondition);
      } else {
        throw new Error('Temperature data missing');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2 bg-gradient-to-br from-sky-100 to-indigo-50 m-5">
      <div className="max-w-md w-full space-y-6">
  <h1 className="text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent p-5">
    Weatherly
  </h1>
  <div className="flex flex-col space-y-6 bg-[#FED2E2]/30 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-4 border-black">
    <input
      value={city}
      onChange={(e)=>setCity(e.target.value)}
      className="w-full px-6 py-4 border-2 border-black rounded-2xl shadow-sm text-black placeholder-[#C68EFD]/60 focus:outline-none focus:ring-2 focus:ring-[#8F87F1] focus:border-[#C68EFD] transition-all"
      placeholder="Enter city name"
    />
    
    <button
      onClick={fetchWeather}
      className="w-full px-6 py-4 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] text-white text-lg font-semibold rounded-2xl hover:shadow-lg hover:from-[#7A72E0] hover:to-[#B57EF0] transition-all border-2 border-black"
    >
      Get Weather
    </button>
    
             

    {temperature !== null && (
  <div className="space-y-4 text-center b-black">
    <div className="bg-[#FED2E2]/40 rounded-2xl p-6 shadow-inner border-3 border-black">
     
      {(() => {
        const roundedTemp = Math.round(temperature);
        //const finalTemp = `${roundedTemp}&#176;C`;
        return (
          <span className="text-6xl font-bold text-[#8F87F1]">
            
            <p> {roundedTemp}&#176;C</p>
          </span>
        );
      })()}
      <p className="mt-4 text-lg font-medium text-black">
        {condition}
      </p>
    </div>
  </div>
)}


    {error && (
      <div className="p-4 bg-[#E9A5F1]/20 rounded-xl">
        <p className="text-[#8F87F1] font-medium">⚠️ {error}</p>
      </div>
    )}
  </div>

  <footer className="text-center text-black text-sm">
    Powered by WeatherAPI.com
  </footer>
</div>
    </main>
  );
}
