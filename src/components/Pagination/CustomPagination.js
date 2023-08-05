import React from 'react';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const CustomPagination = ({ setPage, noOfPages=10 }) => {
  
  const handlePageChange = (event, page) => {
    setPage(page);
    window.scroll(0, 0);
  }

  return (
    <ThemeProvider theme={darkTheme}>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
                width: '100%'
            }}
        >
            <Pagination 
                onChange={handlePageChange}
                count={noOfPages}
                hideNextButton
                hidePrevButton
                color='primary'
            />
        </div>
    </ThemeProvider>
  );
}

export default CustomPagination;
