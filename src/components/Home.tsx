import AllCityData from "./AllCityData";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar page="home" />
      <div className="mt-20 p-8">
        <AllCityData />
      </div>
    </>
  )
}

export default Home;