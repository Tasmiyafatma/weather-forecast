import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { update5DaysForecast } from '../utils/cityDataSlice';

const useFetch5DaysWeatherForecast = (apiEndpoint: string) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiEndpoint);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                dispatch(update5DaysForecast(data)); // Dispatch action to update Redux store
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Clean-up function
        return () => {
            // Add any clean-up code if needed
        };
    }, [dispatch, apiEndpoint]); // Ensure useEffect runs when apiEndpoint changes or dispatch function changes
};

export default useFetch5DaysWeatherForecast;
