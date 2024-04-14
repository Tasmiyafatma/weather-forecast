import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import WeatherForecast from "./components/WeatherForecast";

// Create a browser router instance with routes for different paths
const router = createBrowserRouter([
  {
    // Define route for the home page
    path: '',
    // Render the Home component when the path is '/'
    element: <Home />
  },
  {
    // Define route for the weather forecast page
    path: '/weather-forecast',
    // Render the WeatherForecast component when the path is '/weather-forecast'
    element: <WeatherForecast />
  }
])


function App() {
  // Render the App component with Redux store and router provider
  return (
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App;