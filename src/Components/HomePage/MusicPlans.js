import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import im from '../Image/icons8-apple-24.png';

const MusicPlans = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/signup');
        }
    }, [navigate]);

    const handleClick = (plan) => {
        toast.success(`You are not eligible for the plan`);
    };

    return (
        <div className="min-h-screen pt-20 pb-24 bg-gray-100">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-4">
                    <img src={im} alt="Apple Music" className="h-10 sm:h-12 md:h-16" />
                    <p className="text-3xl sm:text-4xl md:text-5xl font-bold">Music</p>
                </div>
            </div>
            <div className="flex flex-wrap justify-center space-y-6 sm:space-y-0 sm:space-x-4">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-64">
                    <h2 className="text-xl font-bold">Voice Plan</h2>
                    <p className="text-lg mt-2">$4.99/month</p>
                    <hr className="my-4" />
                    <ul className="text-sm space-y-1">
                        <li>1 person</li>
                        <li>Siri on Apple devices</li>
                        <li>Songs, playlists, stations</li>
                        <li>All Apple devices</li>
                    </ul>
                    <button
                        onClick={() => handleClick('Voice Plan')}
                        className="bg-blue-500 mt-5 text-white px-4 py-2 rounded-lg w-full"
                    >
                        Choose a Plan
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-64">
                    <h2 className="text-xl font-bold">Individual Plan</h2>
                    <p className="text-lg mt-2">$9.99/month</p>
                    <hr className="my-4" />
                    <ul className="text-sm space-y-1">
                        <li>1 person</li>
                        <li>Siri on Apple devices</li>
                        <li>Songs, playlists, stations, lyrics, music videos</li>
                        <li>Spatial and lossless audio</li>
                        <li>Apple + supported devices</li>
                    </ul>
                    <button
                        onClick={() => handleClick('Individual Plan')}
                        className="bg-blue-500 mt-5 text-white px-4 py-2 rounded-lg w-full"
                    >
                        Choose a Plan
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-64">
                    <h2 className="text-xl font-bold">Family Plan</h2>
                    <p className="text-lg mt-2">$14.99/month</p>
                    <hr className="my-4" />
                    <ul className="text-sm space-y-1">
                        <li>Up to 6 people</li>
                        <li>Siri on Apple devices</li>
                        <li>Songs, playlists, stations, lyrics, music videos</li>
                        <li>Spatial and lossless audio</li>
                        <li>Apple + supported devices</li>
                    </ul>
                    <button
                        onClick={() => handleClick('Family Plan')}
                        className="bg-blue-500 mt-5 text-white px-4 py-2 rounded-lg w-full"
                    >
                        Choose a Plan
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MusicPlans;
