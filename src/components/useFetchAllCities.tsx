import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCityData } from '../utils/cityDataSlice';
import { updateFilteredResults } from '../utils/searchSlice';

const useFetchAllCities = (apiEndpoint: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const finalData = [];
        for (const item of data.records){
          finalData.push(item.fields)
        }
        dispatch(updateCityData(finalData)); // Dispatch action to update Redux store
        dispatch(updateFilteredResults(finalData)); // Dispatch action to update
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

export default useFetchAllCities;
