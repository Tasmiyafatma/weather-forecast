import { configureStore } from "@reduxjs/toolkit";
import cityDataSlice from "./cityDataSlice";
import searchSlice from "./searchSlice";

// Configure the Redux store using configureStore from Redux Toolkit
const appStore = configureStore({
  // Define reducers for the store, specifying how the state should be updated
  reducer: {
    // Define a reducer slice for managing city data
    cityData: cityDataSlice,
    // Define a reducer slice for managing search-related state
    search: searchSlice,
  },
});

// Export the configured Redux store to be used in other parts of the application
export default appStore;
