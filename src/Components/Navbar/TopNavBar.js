import React, { useState } from 'react';
import { UserIcon } from '@heroicons/react/outline';
import Sing from '../SingINpage/Sing';
import AudioPlayer from '../Context/AudioPlayer';
import im from '../image/icons8-apple-24.png';

const TopNavBar = () => {
    const [isSignInOpen, setSignInOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    return (
        <div className="bg-gradient-to-r from-indigo-900 via-purple-400 to-purple-600 shadow-md fixed w-full flex items-center justify-between px-4 py-2 z-10">
            <div className="p-4 flex items-center">
                <img src={im} alt="Logo" className="h-8 w-8" />
                <span className="ml-3 text-2xl font-semibold">Music</span>
            </div>
            <div className="flex items-center ml-20">
                <AudioPlayer />
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
    );
};

export default TopNavBar;