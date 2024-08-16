import React, { useEffect, useState, useContext } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MusicContext } from '../../Context/MusicContext';

function Romantic() {
    const [songs, setSongs] = useState([]);
    const [hoveredSong, setHoveredSong] = useState(null);
    const { setSelectedMusic } = useContext(MusicContext);

    useEffect(() => {
        fetch('https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"romantic"}&limit=50', {
            headers: {
                'projectId': 'u0kdju5bps0g',
            },
        })
            .then(response => response.json())
            .then(data => setSongs(data.data))
    }, []);

    const handleSongClick = (song) => {
        setSelectedMusic({
            title: song.title,
            _id: song._id,
            audio_url: song.audio_url,
            thumbnail: song.thumbnail,
        });
    };

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

    return (
        <>
            <h2 className="text-xl font-semibold mb-2 ">Romantic Songs</h2>
            <div className='cursor-pointer' >
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
                                className="cursor-pointe p-2"
                                onClick={() => handleSongClick(song)}
                                onMouseEnter={() => setHoveredSong(song)}
                                onMouseLeave={() => setHoveredSong(null)}
                            >
                                <img src={song.thumbnail} alt={song.title} className="w-full h-auto mb-2 rounded" />
                                <h3 className="text-lg font-semibold truncate">{song.title}</h3>
                                {hoveredSong && hoveredSong._id === song._id && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
                                        <p>Now playing</p>
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </>
    );
}

export default Romantic;