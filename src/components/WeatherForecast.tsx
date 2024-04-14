import Navbar from "./Navbar";
import { useNavigate, useSearchParams } from 'react-router-dom';
import useFetch5DaysWeatherForecast from './useFetch5DaysWeatherForecast';
import useFetchCurrentWeather from './useFetchCurrentWeather';
import CurrentWeatherCard from "./CurrentWeatherCard";
import { useSelector } from "react-redux";
import WeatherForecast5DaysCard from "./WeatherForecast5DaysCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";

const WeatherForecast = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    const [maxTemperature, setMaxTemperature] = useState(-Infinity);
    const [minTemperature, setMinTemperature] = useState(Infinity);

    // api key for open weather map API
    const apiId = 'd7c77f464ea215a5d25a08f2aa724f56';

    const weatherForecast5DaysEndPoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiId}`;
    const currentWeatherEndPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiId}`;

    // custom hooks to fetch 5 days weather forecast data
    useFetch5DaysWeatherForecast(weatherForecast5DaysEndPoint);

    // custom hooks to fetch current weather data
    useFetchCurrentWeather(currentWeatherEndPoint);

    // using useSelector getting weather forecast data from redux
    const weatherForecast5Days = useSelector((store: any) => store?.cityData?.forecast5Days);

    // using useSelector getting current weather data from redux
    const currentWeatherData = useSelector((store: any) => store?.cityData?.currentWeather);

    const handleClick = () => {
        const path = "/";
        // on click on the arrow on weather forecast page to go back to home page
        navigate(path);
    }
    if (weatherForecast5Days) {
        // Assume weatherData is the object containing the weather data
        const list = weatherForecast5Days.list;

        // Find the highest and lowest temperatures
        for (const item of list) {
            if (item.main.temp_max > maxTemperature) {
                setMaxTemperature(item.main.temp_max);
            }
            if (item.main.temp_min < minTemperature) {
                setMinTemperature(item.main.temp_min);
            }
        }
    }


    return (
        <div>
            <Navbar page="weather" />
            <div className="mx-20 my-24">
                <div className="flex justify-between items-center gap-4 mb-10">
                    {/* Header prt one back arrow to go back home page and right side displaying max and min temperature of the city */}
                    <div className="">
                        <div className="flex justify-center items-center bg-gray-200 w-10 h-10 rounded-full hover:cursor-pointer" onClick={handleClick}>
                            <ArrowBackIcon />
                        </div>
                        <p className="font-bold text-3xl ">Current Weather of the City</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Max Temperature:</p>
                                <p className="text-lg text-gray-800">{maxTemperature}°C</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Min Temperature:</p>
                                <p className="text-lg text-gray-800">{minTemperature}°C</p>
                            </div>
                        </div>
                </div>

                {/* Current Weather of teh city card */}
                {currentWeatherData && <CurrentWeatherCard />}

                {/* 5 Days Weather Forecast */}
                <p className="font-bold text-3xl mt-10">5 Days Weather Forecast</p>
                <div className="flex flex-wrap gap-5 mt-10">
                    {
                        weatherForecast5Days && weatherForecast5Days.list.map((data: any, index: number) => <WeatherForecast5DaysCard key={index} dt_txt={data.dt_txt} main={data.main} weather={data.weather} wind={data.wind} sys={data.sys} />)
                    }
                </div>

            </div>
        </div>
    )
}

export default WeatherForecast