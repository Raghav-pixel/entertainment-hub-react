import {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './MainNav.css';
import { ThemeProvider } from '@mui/styles';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useNavigate } from 'react-router-dom';

const theme = {
  backgroundColor: '#2d313a',
};


export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
      if(value === 0) {
          navigate('/');
      } else if(value === 1) {
          navigate('/movies');
      } else if(value === 2) {
          navigate('/series');
      } else if(value === 3) {
          navigate('/search');
      }
  }, [value, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
          width: '100%', 
          position: 'fixed', 
          bottom: '0',
          backgroundColor: '#2d313a',
          zIndex: '100' 
      }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction 
            style={{ color: 'black' }}
            label="Trending" 
            icon={<WhatshotIcon />} 
          />
          <BottomNavigationAction 
            style={{ color: 'black' }}
            label="Movies" 
            icon={<MovieIcon />} 
          />
          <BottomNavigationAction
            style={{ color: 'black' }} 
            label="Tv Series" 
            icon={<TvIcon />}
          />
          <BottomNavigationAction
            style={{ color: 'black' }} 
            label="Search" 
            icon={<SearchIcon />}
          />
        </BottomNavigation>
      </Box>
    </ThemeProvider>
  );
}