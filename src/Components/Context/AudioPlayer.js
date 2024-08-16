import React, { useContext, useState, useEffect } from 'react';
import { MusicContext } from './MusicContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AudioPlayer({ hidden }) {
    const { selectedMusic, favorites } = useContext(MusicContext);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(favorites?.some(song => song._id === selectedMusic?._id));
    }, [selectedMusic, favorites]);

    const handleFavoriteToggle = async () => {
        const songId = selectedMusic?._id;
        let token = sessionStorage.getItem('token');

        if (!token) {
            toast.error('Please log in to like a song.');
            return;
        }

        const projectID = 'u0kdju5bps0g';

        try {
            let newIsFavorite = !isFavorite;
            const response = await fetch(`https://academics.newtonschool.co/api/v1/music/favorites/like`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'projectID': projectID
                },
                body: JSON.stringify({ songId })
            });

            if (response.ok) {
                setIsFavorite(newIsFavorite);
                toast.success(`Song ${newIsFavorite ? 'added to' : 'removed from'} favorites!`);
            } else {
                toast.error('Failed to update favorite status');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while updating the favorite status');
        }
    };

    return (
        <div className="navbar-audio-player flex flex-row items-center gap-5">
            <img src={selectedMusic?.thumbnail ? selectedMusic.thumbnail : 'https://via.placeholder.com/150'} alt={selectedMusic?.title} className="w-16 h-16 rounded" />
            {selectedMusic?.audio_url ? (
                <audio controls autoPlay src={selectedMusic.audio_url} controlsList="nodownload noplaybackrate">
                    Your browser does not support the audio element.
                </audio>
            ) : (
                <p>No song selected</p>
            )}
            <button 
                onClick={handleFavoriteToggle} 
                className={`ml-4 text-white rounded`}
            >
                {isFavorite ? '❤' : '🤍'}
            </button>
            <ToastContainer />
        </div>
    );
}

export default AudioPlayer;