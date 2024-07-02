import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ViewGridIcon, LibraryIcon, MusicNoteIcon, SearchIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { MusicContext } from '../Context/MusicContext';
import im from '../Image/icons8-apple-24.png';

const Sidebar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { setSelectedMusic } = useContext(MusicContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery.length > 2) {
                try {
                    const response = await fetch(`https://academics.newtonschool.co/api/v1/music/song?search={"title":"${searchQuery}"}`, {
                        headers: {
                            'projectID': 'u0kdju5bps0g'
                        }
                    });
                    const data = await response.json();
                    setSearchResults(data.data);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            } else {
                setSearchResults([]);
            }
        };

        fetchData();
    }, [searchQuery]);

    const handleResultClick = (song) => {
        setSelectedMusic({
            title: song.title,
            _id: song._id,
            audio_url: song.audio_url,
            thumbnail: song.thumbnail,
        });
    };

    return (
        <>

            <div className="md:hidden flex items-center p-4 pt-7 fixed top-0  z-20">
                <button onClick={() => setIsSidebarOpen(true)}>
                    <MenuIcon className="h-6 w-6 text-black" />
                </button>
            </div>

            <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-900 to-purple-600 shadow-md transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-30`}>
                <div className="p-4 pl-10 flex items-center">
                    <img src={im} alt="Logo" className="h-8 w-8" />
                    <span className="ml-3 text-3xl font-semibold text-white">Music</span>
                </div>
                <div className="p-4 mt-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {searchResults.length > 0 && (
                        <div className="mt-2 bg-white shadow-lg rounded-lg">
                            <ul>
                                {searchResults.map((result, index) => (
                                    <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleResultClick(result)}>
                                        {result.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="mt-6 pl-3">
                    <nav>
                        <ul>
                            <li className="flex items-center p-2 text-white hover:bg-black cursor-pointer">
                                <HomeIcon className="h-6 w-6" />
                                <Link to="/" className="ml-4">Home</Link>
                            </li>
                            <li className="flex items-center p-2 text-white hover:bg-black cursor-pointer">
                                <ViewGridIcon className="h-6 w-6" />
                                <Link to="/browse" className="ml-4">Browse</Link>
                            </li>
                            <li className="flex items-center p-2 text-white hover:bg-black cursor-pointer">
                                <LibraryIcon className="h-6 w-6" />
                                <Link to="/radio" className="ml-4">Library</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="absolute bottom-4 left-4">
                    <button className="flex items-center text-gray-700 hover:text-gray-900">
                        <MusicNoteIcon className="h-6 w-6" />
                        <span className="ml-2">Open in Music</span>
                    </button>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 md:hidden text-gray-700">
                    <XIcon className="h-6 w-6 text-white" />
                </button>
            </div>
        </>
    );
};

export default Sidebar;
