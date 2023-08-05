import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import './ContentModal.css';
import ViewCarousel from '../Carousel/Carousel';
import YouTubeIcon from "@mui/icons-material/YouTube";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '80%',
  backgroundColor: '#39445a',
  border: '2px solid #282c34',
  borderRadius: 10,
  color: 'white',
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async() => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?language=en-US`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_READ_ACCESS_TOKEN}`
          }
    });
    console.log(data, 'content')
    setContent(data)
  }

  const fetchVideo = async() => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?language=en-US`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_READ_ACCESS_TOKEN}`
          }
    });
    console.log(data, 'video');
    setVideo(data.results[0]?.key);
  }

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
      <div className='media' style={{ cursor: "pointer" }} onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          {content && 
          (<Box sx={style}>
            <div className='ContentModal'>
                <div className='poster_image'>
                  <img 
                      alt={content.name || content.title}
                      className='ContentModal__landscape' 
                      src={content.backdrop_path?`${img_500}/${content.backdrop_path}`: unavailableLandscape} 
                  />
                  <img 
                      alt={content.name || content.title}
                      className='ContentModal_portrait' 
                      src={content.poster_path?`${img_500}/${content.poster_path}`: unavailable} 
                  />
                </div>
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  {/* <div style={{ width: '150px', height: '130px' }}>
                    <ViewCarousel id={id} media_type={media_type} />
                  </div> */}

                  <Button
                    style={{
                      width: '80%',
                      backgroundColor: '#f50057'
                    }}
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
            </div>
          </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}