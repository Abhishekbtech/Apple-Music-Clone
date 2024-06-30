import React, { useState, useEffect,useContext } from 'react';
import { MusicContext } from '../Context/MusicContext';

function RadioPage() {
    const [favoriteShows, setFavoriteShows] = useState([]);
    const { setSelectedMusic } = useContext(MusicContext);

    useEffect(() => {
        fetchFavoriteShows();
    },[]);

    const fetchFavoriteShows = async () => {
        try {
            const jwtToken = sessionStorage.getItem('token');
            const projectID = 'u0kdju5bps0g';

            const response = await fetch('https://academics.newtonschool.co/api/v1/music/favorites/like', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'projectID': projectID
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setFavoriteShows(data.data.songs);
        } catch (error) {
            console.error('Error fetching favorite shows:', error);
        }
    };

    const handleSongClick = (songItem) => {
        setSelectedMusic({
            title: songItem.title,
            _id: songItem._id,
            audio_url: songItem.audio_url,
            thumbnail: songItem.thumbnail,
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-6">Favorite Songs</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Track</th>
                            <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mood</th>
                            <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Release</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favoriteShows && favoriteShows.map((songItem, index) => (
                            <tr key={songItem._id}>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700">{index + 1}</td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap border-b border-gray-700 cursor-pointer"
                                    onClick={() => handleSongClick(songItem)}
                                >
                                    <div className="flex items-center">
                                        <img src={songItem.thumbnail} alt={songItem.title} className="w-10 h-10 rounded" />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-white">{songItem.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700 text-sm text-gray-400">
                                    {songItem.mood}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700 text-sm text-gray-400">
                                    {new Date(songItem.dateOfRelease).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RadioPage;