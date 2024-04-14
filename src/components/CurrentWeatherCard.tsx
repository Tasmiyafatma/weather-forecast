import { useSelector } from 'react-redux';

const CurrentWeatherCard = () => {

        // using useSelector getting current weather data from redux
    const currentWeatherData = useSelector((store: any) => store?.cityData?.currentWeather);

    // desctructing current weather data after getting it from redux
    const { name, main, weather, wind, sys } = currentWeatherData;

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

    return (
        <div className={`mb-10 bg-white border rounded-md shadow-md p-6 w-full flex justify-between items-center ${getBackgroundColor()} max-[1000px]:flex-col max-[1000px]:text-center`}>
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
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
                <p className="text-lg font-semibold mb-1">Temperature: {main.temp}°C</p>
                <p className="text-sm">Feels like: {main.feels_like}°C</p>
                <p className="text-sm">Humidity: {main.humidity}%</p>
            </div>
            <div className="mt-4">
                <p className="text-lg font-semibold">Wind</p>
                <p className="text-sm">Speed: {wind.speed} m/s</p>
                <p className="text-sm">Direction: {wind.deg}°</p>
            </div>
            <div className="mt-4">
                <p className="text-lg font-semibold">Country: {sys.country}</p>
                <p className="text-sm">Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p className="text-sm">Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
        </div>
    );
};

export default CurrentWeatherCard;
