import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Artists() {
    const [songs, setSongs] = useState([]);
    // const navigator = useNavigate();

    useEffect(() => {
        fetch('https://academics.newtonschool.co/api/v1/music/artist', {
            headers: {
                'projectId': 'u0kdju5bps0g',
            },
        })
            .then(response => response.json())
            .then(data => setSongs(data.data))
    }, []);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    const handleSongClick = (song) => {
        toast.success(`${song.name}'s page under Working`);
    };

    return (
        <>
            <h2 className="text-xl font-semibold mb-2">Artists</h2>
            <div className='cursor-pointer'>
                <Carousel
                    responsive={responsive}
                    swipeable={false}
                    draggable={false}
                    infinite={true}
                    itemClass="carousel-item-padding-40-px"
                    className='z-0 relative'
                >
                    {
                        songs.map((song) => (
                            <div
                                key={song._id}
                                className="cursor-pointer p-2 transition-transform transform hover:scale-105"
                                onClick={() => handleSongClick(song)}
                            >
                                <img src={song.image} alt={song.title} className="w-full h-auto mb-2 rounded" />
                                <h3 className="text-lg font-semibold truncate">{song.name}</h3>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
            <ToastContainer />
        </>
    );
}

export default Artists;
