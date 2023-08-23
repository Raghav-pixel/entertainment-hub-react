import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination';
import './Movies.css';
import Genres from '../../Genres';
import useGenre from '../../hooks/useGenre';

const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genres, setGenres] = useState([]);

  const genreforUrl = useGenre(selectedGenre);

  const fetchMovies = async() => {
    
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&page=${page}&with_genres=${genreforUrl}&language=en-US&sort_by=popularity.desc`, {
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
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genreforUrl]);

  return (
    <div>
      <span className='pageTitle'>Movies</span>
      <Genres 
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className='movies'>
      {
        content && content.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type="movie"
            vote_average={c.vote_average}
          />
        ))
      }
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
}

export default Movies;
