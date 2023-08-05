import { Button, Tab, Tabs, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [content, setContent] = useState([]);

  const handleChange = (event, newValue) => {
    setType(newValue);
  };

  const fetchSearch = async() => {
    const data = await axios.get(`https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?query=${searchText}&include_adult=true&language=en-US&page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_READ_ACCESS_TOKEN}`
      }
    });
    console.log(data);
    setContent(data.data.results);
    setNoOfPages(data.data.total_pages);
  }

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [page, type]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          display: 'flex',
          paddingBottom: '8px'
        }}
      >
        <div style={{ flex: 1, width: '100%' }}>
          <TextField 
            style={{ flex: 1, width: '100%' }} 
            id="filled-basic" 
            label="Search" 
            variant="filled" 
            size='small' 
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <Button style={{ marginLeft: '10px' }} variant='contained' onClick={fetchSearch}>
          <SearchIcon />
        </Button>
      </div>

      <Tabs value={type} onChange={handleChange} indicatorColor='primary' textColor='primary' style={{ paddingBottom: '10px' }}>
        <Tab label="SEARCH MOVIES" />
        <Tab label="SEARCH TV SERIES" />
      </Tabs>

      <div className='movies'>
      {
        content && content.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={type ? 'tv' : 'movies'}
            vote_average={c.vote_average}
          />
        ))
      }
      {
        searchText && !content &&
        (type? <h2>No Series found</h2> : <h2>No Movies found</h2>)
      }
      </div>
      {
        noOfPages > 1 && (
          <CustomPagination setPage={setPage} />
        )
      }
    </ThemeProvider>
  );
}

export default Search;
