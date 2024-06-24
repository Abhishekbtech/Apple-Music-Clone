import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function TopCharts() {
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [error, setError] = useState(null);
    const [hoveredSong, setHoveredSong] = useState(null);
    const itemsPerPage = 5;
    const navigate = useNavigate();
    // const { setSelectedMusic } = useContext(MusicContext);

    useEffect(() => {
        fetch('https://academics.newtonschool.co/api/v1/music/album?sort={"top":1}&limit=100', {
            headers: {
                'projectId': 'u0kdju5bps0g',
            },
        })
            .then(response => response.json())
            .then(data => setSongs(data.data))
            .catch(error => setError(error.message));
    }, []);

    const handleNextSongs = () => {
        if (currentSongIndex + itemsPerPage < songs.length) {
            setCurrentSongIndex(currentSongIndex + 1);
        }
    };

    const handlePreviousSongs = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(currentSongIndex - 1);
        }
    };

    const handleSongClick = (song) => {
        // setSelectedMusic({
        //     title: song.title,
        //     _id: song._id,
        //     audio_url: song.songs,
        //     thumbnail: song.thumbnail,
        // });
        navigate('/browse/details', {state :{song}})
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <h2 className="text-xl font-semibold mb-2 ml-9">Top Charts</h2>
            <div className="flex items-center">
                <button onClick={handlePreviousSongs} disabled={currentSongIndex === 0} className="p-2 font-extrabold">
                    &#8810;
                </button>
                <div className="flex overflow-hidden space-x-4">
                    {songs.slice(currentSongIndex, currentSongIndex + itemsPerPage).map(song => (
                        <div
                            key={song._id}
                            className="flex-shrink-0 w-60 p-1 cursor-pointer relative"
                            onClick={() => handleSongClick(song)}
                            onMouseEnter={() => setHoveredSong(song)}
                            onMouseLeave={() => setHoveredSong(null)}
                        >
                            <img src={song.image} alt={song.title} className="w-full h-auto mb-2 rounded" />
                            <h3 className="text-lg font-semibold truncate">{song.title}</h3>
                            {hoveredSong && hoveredSong._id === song._id && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
                                    <p>Now playing</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={handleNextSongs} disabled={currentSongIndex + itemsPerPage >= songs.length} className="p-2 font-extrabold">
                    &#8811;
                </button>
            </div>
        </>
    );
}

export default TopCharts