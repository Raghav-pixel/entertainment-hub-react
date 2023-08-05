import { Chip } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';

const Genres = ({
    selectedGenre,
    setSelectedGenre,
    genres,
    setGenres,
    setPage
}) => {

    const fetchGenre = async() => {
        const data = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.REACT_APP_API_READ_ACCESS_TOKEN}`
            }
        });
        console.log(data, 'genre data');
        setGenres(data.data.genres);
    }

    const handleAdd = (genre) => {
        setSelectedGenre([...selectedGenre, genre]);
        setGenres(genres.filter(g => g.id !== genre.id));
        setPage(1);
    }

    const handleDelete = (genre) => {
        setSelectedGenre(selectedGenre.filter((g) => g.id !== genre.id));
        setGenres([ ...genres, genre ]);
        setPage(1);
    }

    useEffect(() => {
        fetchGenre();

        return () => {
            setGenres([]);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >
            {
                selectedGenre && selectedGenre.map((genre) => (
                    <div
                        key={genre.id}
                    >
                        <Chip
                            key={genre.id}
                            size='small'
                            label={genre.name}
                            clickable
                            style={{ margin: 2 }}
                            color='primary'
                            onDelete={() => handleDelete(genre)}
                        />
                    </div>
                ))
            }
            {
                genres && genres.map((g) => (
                    <div
                        key={`${g.id}-${g.name}`}
                        style={{
                            padding: '2px',
                        }}
                    >
                        <Chip
                            key={g.id}
                            size='small'
                            label={g.name}
                            clickable
                            style={{ margin: 2 }}
                            onClick={() => handleAdd(g)}
                        />
                    </div>
                ))
            }
        </div>
    );
}

export default Genres;
