import React, { useEffect } from 'react';
import IM from './Image/large.webp';
import im from '../Image/icons8-apple-24.png'
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigator = useNavigate()
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handlingClick = (() => {
        navigator('/plans')
    })

    return (
        <div>
            <div className="text-center mt-19 pt-10 text-white">
                <div className="flex justify-center items-center mt-8">
                    <img src={im} alt="Logo" className="h-8 w-8" />
                    <span className="ml-3 text-2xl font-semibold">Music</span>
                </div>
                
                <h1 className="text-4xl font-bold mt-1">Discover new music every day.</h1>
                <p className="mt-4 text-lg mb-0">Get playlists and albums inspired by the artists and </p>
                <p className=" text-lg">genres you’re listening to. 1 month free, then </p>
                <p className="text-lg">$10.99/month.</p>
                <button onClick={handlingClick}className="bg-red-500 text-white px-6 py-3 mt-4 rounded-full">Try It Free</button><br /><br />
            </div>

            <img src={IM} alt="Main content" className="mt-3 mx-auto" />
        </div>
    );
}

export default HomePage;