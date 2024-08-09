import React, { useEffect, useState, useContext } from 'react'
import { MusicContext } from '../Context/MusicContext';
import { useParams } from 'react-router-dom';

function Artist() {
    const [artist, setArtist] = useState([]);
    const { setSelectedMusic } = useContext(MusicContext);
    const {id} = useParams()
    console.log("id coming", id)
    console.log("data", artist)

    useEffect(() => {
        async function fetchArtist() {
            try {
                const response = await fetch(`https://academics.newtonschool.co/api/v1/music/artist`, {
                    headers: {
                        'projectId': 'u0kdju5bps0g',
                    },
                });
                const data = await response.json();
                setArtist(data.data);
                console.log("data", artist)
            } catch (error) {
                console.error('Error fetching artist:', error);
            }
        }
        
        fetchArtist();
    }, [])

    const handleSongClick = (song) => {
        setSelectedMusic({
            title: song.title,
            _id: song._id,
            audio_url: song.audio_url,
            thumbnail: song.thumbnail,
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 mt-12 md:mt-11">{artist.name}</h1>
            <div className="overflow-x-auto">
                <table className="w-full bg-gray-800">
                    <thead>
                        <tr>
                            <th className="px-2 md:px-6 py-3 border-b border-gray-700 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-2 md:px-6 py-3 border-b border-gray-700 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Track</th>
                            <th className="px-2 md:px-6 py-3 border-b border-gray-700 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Mood</th>
                            <th className="px-2 md:px-6 py-3 border-b border-gray-700 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Date of Release</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artist.songs.map((songItem, index) => (
                            <tr key={songItem._id}>
                                <td className="px-2 md:px-6 py-4 whitespace-nowrap border-b border-gray-700">{index + 1}</td>
                                <td
                                    className="px-2 md:px-6 py-4 whitespace-nowrap border-b border-gray-700 cursor-pointer"
                                    onClick={() => handleSongClick(songItem)}
                                >
                                    <div className="flex items-center">
                                        <img src={songItem.thumbnail} alt={songItem.title} className="w-8 h-8 md:w-10 md:h-10 rounded" />
                                        <div className="ml-2 md:ml-4">
                                            <div className="text-xs md:text-sm font-medium text-white">{songItem.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 md:px-6 py-4 whitespace-nowrap border-b border-gray-700 text-xs md:text-sm text-gray-400">
                                    {songItem.mood}
                                </td>
                                <td className="px-2 md:px-6 py-4 whitespace-nowrap border-b border-gray-700 text-xs md:text-sm text-gray-400">
                                    {new Date(songItem.dateOfRelease).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {/* {
                            artist.songs.map((song) => (
                                <h3>{song.title}</h3>
                            ))
                        } */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Artist