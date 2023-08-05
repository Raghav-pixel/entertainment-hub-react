import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import './Trending.css';
import CustomPagination from '../../Pagination/CustomPagination';

const Trending = () => {

  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTrending = async() => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?language=en-US&page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_READ_ACCESS_TOKEN}`
      }
    });
    console.log(data.results);
    console.log(data.total_pages);
    setContent(data.results);
  }

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className='pageTitle'>Trending</span>
      <div className='trending'>
      {
        content && content.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average}
          />
        ))
      }
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
}

export default Trending;
