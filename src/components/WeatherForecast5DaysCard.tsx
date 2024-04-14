import { useState } from 'react';

const WeatherForecast5DaysCard = (props: any) => {
  const { dt_txt, main, weather, wind } = props;

  // Define a function to determine the background color based on weather condition
  const getBackgroundColor = () => {
    // You can define your own logic here to map weather conditions to background colors
    switch (weather[0].main.toLowerCase()) {
      case 'clear':
        return 'bg-yellow-200';
      case 'clouds':
        return 'bg-gray-200';
      case 'rain':
        return 'bg-blue-200';
      case 'snow':
        return 'bg-white';
      default:
        return 'bg-gray-100';
    }
  };

  const [unit, setUnit] = useState('metric'); // Default unit for temperature: Celsius

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  // Convert temperature to the selected unit (Celsius or Fahrenheit)
  const convertTemperature = (temp: any) => {
    if (unit === 'metric') {
      // Convert to Celsius (default unit)
      return temp;
    } else {
      // Convert to Fahrenheit
      return (temp * 9) / 5 + 32;
    }
  };

  // Convert wind speed to the selected unit (m/s or km/h)
  const convertWindSpeed = (speed: any) => {
    if (unit === 'metric') {
      // Convert to m/s (default unit)
      return speed;
    } else {
      // Convert to km/h
      return speed * 3.6;
    }
  };



  return (
    <div className={`bg-white border rounded-md shadow-md p-6 w-64 ${getBackgroundColor()}`}>
      <h2 className="text-lg font-semibold mb-2">{new Date(dt_txt).toLocaleDateString()}</h2>
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 mr-4"
          src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
          alt={weather[0].description}
        />
        <div>
          <p className="text-lg font-semibold">{weather[0].main}</p>
          <p className="text-sm">{weather[0].description}</p>
        </div>
      </div>
      <div>
        {/* <p className="text-lg font-semibold mb-1">Temperature: {main.temp}°C</p> */}
        <p className="text-lg font-semibold mb-1">
          Temperature: {convertTemperature(main.temp).toFixed(1)} {unit === 'metric' ? '°C' : '°F'}
          <button className="text-blue-600 bg-white px-2 my-2 rounded-md shadow-sm" onClick={toggleUnit}>
            {unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
          </button>
        </p>

        <p className="text-sm">Feels like: {convertTemperature(main.feels_like).toFixed(1)} {unit === 'metric' ? '°C' : '°F'}</p>
        <p className="text-sm">Humidity: {main.humidity}%</p>
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold">Wind</p>
        <p className="text-sm">Speed: {convertWindSpeed(wind.speed).toFixed(1)} {unit === 'metric' ? 'm/s' : 'km/h'}</p>
        <p className="text-sm">Direction: {wind.deg}°</p>
      </div>
    </div>
  );
};

export default WeatherForecast5DaysCard;
