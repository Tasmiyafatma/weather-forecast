import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilteredResults, updateQuery } from '../utils/searchSlice';
import { Data } from './DataTable';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '300px',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export default function ButtonAppBar(props: any) {

    const { page } = props;

    const citiesData: Data[] = useSelector((store: any) => store.cityData.data);
    const query = useSelector((state: any) => state.search.query);
    const dispatch = useDispatch();

    const handleSearch = (event: any) => {
        const { value } = event.target;

        const filtered = citiesData.filter((city) =>
            city.geoname_id.toLowerCase().includes(value.toLowerCase()) ||
            city.name.toLowerCase().includes(value.toLowerCase() ||
                city.alternate_names.toLowerCase().includes(value.toLowerCase())) ||
            city.cou_name_en.toLowerCase().includes(value.toLowerCase()) ||
            city.ascii_name.toLowerCase().includes(value.toLowerCase()) ||
            city.country_code.toLowerCase().includes(value.toLowerCase())
        );

        // dispatch an action to update the search query in redux
        dispatch(updateQuery(value));

        // dispatch an action to update the filterd data in redux
        dispatch(updateFilteredResults(filtered));
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Weather Forcast
                    </Typography>
                    {/* TO hide the search filter on 5 days weather forcast page page props I am using */}
                    {
                        page === 'home' && <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search records …"
                                inputProps={{ 'aria-label': 'search' }}
                                value={query}
                                onChange={handleSearch}
                            />
                        </Search>
                    }


                </Toolbar>
            </AppBar>
        </Box>
    );
}