import React, { createContext, useState, useEffect } from 'react';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [selectedMusic, setSelectedMusic] = useState({
        title: "",
        _id: "",
        audio_url: "",
        thumbnail: "",
    });

    const [favorites, setFavorites] = useState([]);
    const projectID = 'u0kdju5bps0g';

    const fetchFavorites = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/music/favorites/like', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectID': projectID,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFavorites(data.data.songs);
            } else {
                console.error('Failed to fetch favorite songs');
            }
        } catch (error) {
            console.error('Error fetching favorite songs:', error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    },[selectedMusic]);

    return (
        <MusicContext.Provider value={{ favorites, selectedMusic, setSelectedMusic, fetchFavorites}}>
            {children}
        </MusicContext.Provider>
    );
};