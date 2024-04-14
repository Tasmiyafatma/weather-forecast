import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import useFetchAllCities from './useFetchAllCities';
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from 'react-router-dom';
import { updateFilteredResults } from '../utils/searchSlice';
import SortIcon from '@mui/icons-material/Sort';

// City Data interface
export interface Data {
    geoname_id: string;
    name: string;
    cou_name_en: string;
    ascii_name: string;
    alternate_names: string;
    population: number;
    dem: number;
    timezone: string;
    country_code: string;
    coordinates: string[];
}

export default function DenseTable() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // using useSelector getting all cities data from redux
    const citiesData: Data[] = useSelector((store: any) => store.cityData.data);

    // using useSelector getting filtered all cities data from redux
    const filteredCitiesData: Data[] = useSelector((store: any) => store.search.filteredResults);

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage: any = (newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // custom hooks to fetch all cities data
    useFetchAllCities('https://public.opendatasoft.com/api/records/1.0/search/?rows=40&disjunctive.cou_name_en=true&sort=name&start=0&fields=geoname_id,name,cou_name_en,ascii_name,alternate_names,population,dem,timezone,country_code,coordinates&dataset=geonames-all-cities-with-a-population-1000&timezone=Asia%2FKolkata&lang=en');

    const handleNameClick = (city: Data) => {

        // On click on city name passing the city name, latitude and longitude in query parameters to get data in weather forecast page
        const path = `/weather-forecast?city_name=${city.name}&latitude=${city.coordinates[0]}&longitude=${city.coordinates[1]}`;
    
        navigate(path);
    }

    const sortByColumn = (columnName: string) => {
        // Sort function for comparison
        const compareBy = (obj1: any, obj2: any) => {
            const value1 = obj1[columnName];
            const value2 = obj2[columnName];

            // Handle different data types (strings by default)
            let comparison = 0;
            if (typeof value1 === 'string' && typeof value2 === 'string') {
                comparison = value1.localeCompare(value2);
            } else {
                comparison = value1 - value2;
            }

            return comparison;
        };

        const copiedData = [...citiesData];
        const filteredData = copiedData.sort(compareBy);

        // After filter dispatching an action to to redux to upadte the filtered data
        dispatch(updateFilteredResults(filteredData));
    }


    return (
        <>
            <TableContainer component={Paper} className="mt-10">
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow style={{ fontWeight: 700, cursor: 'pointer' }}>
                            <TableCell></TableCell>
                            <TableCell onClick={() => sortByColumn('geoname_id')}>
                                Geoname ID
                                <SortIcon />
                            </TableCell>
                            <TableCell onClick={() => sortByColumn('name')}>
                                Name
                                <SortIcon className="ml-2" />
                            </TableCell>
                            <TableCell onClick={() => sortByColumn('cou_name_en')}>
                                Country name EN
                                <SortIcon className="ml-2" />
                            </TableCell>
                            <TableCell onClick={() => sortByColumn('ascii_name')}>
                                ASCII name
                                <SortIcon className="ml-2" />
                            </TableCell>
                            <TableCell width="200" onClick={() => sortByColumn('alternate_names')}>
                                Alternate name
                                <SortIcon className="ml-2" />
                            </TableCell>
                            <TableCell onClick={() => sortByColumn('population')}>
                                Population
                                <SortIcon />
                            </TableCell>
                            <TableCell onClick={() => sortByColumn('dem')}>
                                Digital Elevation Model
                                <SortIcon className="ml-2" />
                            </TableCell>
                            <TableCell onClick={() => sortByColumn('timezone')}>
                                Timezone
                                <SortIcon className="ml-2" />
                            </TableCell>
                            <TableCell onClick={() => sortByColumn('country_code')}>
                                Country Code
                                <SortIcon className="ml-2" />
                            </TableCell>
                            <TableCell onClick={() => sortByColumn('coordinates')}>
                                Coordinates
                                <SortIcon className="ml-2" />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCitiesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((city: Data, index: number) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className='hover:bg-gray-100'
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{city.geoname_id}</TableCell>
                                <TableCell onClick={() => handleNameClick(city)} className='hover: cursor-pointer'>{city.name}</TableCell>
                                <TableCell>{city.cou_name_en}</TableCell>
                                <TableCell>{city.ascii_name}</TableCell>
                                <TableCell width="200">{city.alternate_names}</TableCell>
                                <TableCell>{city.population}</TableCell>
                                <TableCell>{city.dem}</TableCell>
                                <TableCell>{city.timezone}</TableCell>
                                <TableCell>{city.country_code}</TableCell>
                                <TableCell>{city.coordinates.join(', ')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={citiesData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className='shadow-lg mt-3 border-3 border-gray-200 rounded-md'
            />

        </>
    );
}