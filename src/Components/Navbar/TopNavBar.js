import React, { useState, useEffect } from 'react';
import { Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AudioPlayer from '../Context/AudioPlayer';
import im from '../Image/icons8-apple-24.png';
import { Link, useNavigate } from 'react-router-dom';
import './ind.css'

const TopNavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const storedUsername = sessionStorage.getItem('name');
            setUsername(storedUsername || '');
        }
    }, []);

    const handleMenuOpen = (event) => {
        if (isLoggedIn) {
            setAnchorEl(event.currentTarget);
        } else {
            navigate('/signup');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
        handleMenuClose();
    };

    const handleingPassword = () => {
        navigate('/updatepassword');
        handleMenuClose();
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
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
                <Link to='/' className="p-4 flex items-center ml-4">
                    <img src={im} alt="Logo" className="h-8 w-8" />
                    <span className="ml-3 text-3xl font-semibold text-white">Music</span>
                </Link>
                <div className="hidden md:flex items-center ml-20">
                    {!isMobile && <AudioPlayer />}
                </div>
                <div className="flex items-center space-x-2">
                    <AccountCircleIcon className="text-red-700 cursor-pointer" onClick={handleMenuOpen} />
                    {isLoggedIn ? (
                        <span>Hi {username}</span>
                    ) : (
                        <span className="text-gray-700" onClick={() => navigate('/signup')}>
                            Sign up
                        </span>
                    )}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleingPassword}>Update Password</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
            <div id="ind" className="md:hidden fixed bottom-0 w-full bg-gradient-to-r from-indigo-900 via-purple-400 to-purple-600 shadow-md p-4">
                {isMobile && <AudioPlayer />}
            </div>
        </>
    );
};

export default TopNavBar;