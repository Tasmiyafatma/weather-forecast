import DataTable from './DataTable'

const AllCityData = () => {
  return (
    <div>
        <p className='font-bold text-2xl'>Geonames - All Cities with a population &gt; 1000</p>
        <DataTable />
    </div>
  )
}

export default AllCityData