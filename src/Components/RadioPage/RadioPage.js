import React, { useState, useEffect, useContext } from 'react';
import { MusicContext } from '../Context/MusicContext';
import Footer from '../BrowsePage/Footer/Footer';

function RadioPage() {
    const [favoriteShows, setFavoriteShows] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const { setSelectedMusic } = useContext(MusicContext);

    useEffect(() => {
        const jwtToken = sessionStorage.getItem('token');
        if (!jwtToken) {
            setMessage('Please login first');
            setLoading(false);
        } else {
            fetchFavoriteShows(jwtToken);
        }
    }, []);

    const fetchFavoriteShows = async (jwtToken) => {
        try {
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
            if (data.data.songs.length === 0) {
                setMessage('Please add songs to the playlist');
            } else {
                setFavoriteShows(data.data.songs);
            }
        } catch (error) {
            console.error('Error fetching favorite shows:', error);
            setMessage('Failed to load favorite shows');
        } finally {
            setLoading(false);
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

    const removeSong = async (songId) => {
        const jwtToken = sessionStorage.getItem('token');
        if (!jwtToken) return;

        try {
            const projectID = 'u0kdju5bps0g';

            const response = await fetch(`https://academics.newtonschool.co/api/v1/music/favorites/like`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                    'projectID': projectID
                },
                body: JSON.stringify({ songId })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setFavoriteShows(favoriteShows.filter(song => song._id !== songId));
        } catch (error) {
            console.error('Error removing song:', error.message);
            setMessage('Failed to remove song from favorites');
        }
    };

    return (
        <>
            <div className="min-h-screen bg-black text-white p-8">
                <h1 className="text-3xl font-bold mb-6 mt-10">Favorite Songs</h1>
                {loading ? (
                    <div className="text-center text-lg">Loading...</div>
                ) : message ? (
                    <div className="text-center text-lg">{message}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-800">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Track</th>
                                    <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mood</th>
                                    <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Release</th>
                                    <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {favoriteShows.map((songItem, index) => (
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
                                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700 text-sm text-gray-400">
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => removeSong(songItem._id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    );
}

export default RadioPage;