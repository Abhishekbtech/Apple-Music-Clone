import React, { useState, useEffect } from 'react';
import { UserIcon } from '@heroicons/react/outline';
import Sing from '../SingINpage/Sing';
import AudioPlayer from '../Context/AudioPlayer';
import im from '../Image/icons8-apple-24.png';

const TopNavBar = () => {
    const [isSignInOpen, setSignInOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const openSignIn = () => {
        setSignInOpen(true);
    };

    const closeSignIn = () => {
        setSignInOpen(false);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setSignInOpen(false);
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial state
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className="bg-gradient-to-r from-indigo-900 via-purple-400 to-purple-600 shadow-md fixed w-full flex items-center justify-between px-4 py-2 z-10">
                <div className="p-4 flex items-center ml-4">
                    <img src={im} alt="Logo" className="h-8 w-8" />
                    <span className="ml-3 text-3xl font-semibold text-white">Music</span>
                </div>
                <div className="hidden md:flex items-center ml-20">
                    {!isMobile && <AudioPlayer />}
                </div>
                <div className="flex items-center space-x-2">
                    <button className="bg-pink-600 text-white px-3 py-3 rounded-full" onClick={openSignIn}>
                        <UserIcon className="h-4 w-4 inline-block mr-1" />
                        {isLoggedIn ? 'Hello User' : 'Sign In'}
                    </button>
                </div>
                <Sing
                    isOpen={isSignInOpen}
                    onClose={closeSignIn}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                />
            </div>
            <div className="md:hidden fixed bottom-0 w-full bg-gradient-to-r from-indigo-900 via-purple-400 to-purple-600 shadow-md p-4">
                {isMobile && <AudioPlayer />}
            </div>
        </>
    );
};

export default TopNavBar;
