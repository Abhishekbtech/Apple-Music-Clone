import React, { useEffect } from 'react';
import IM from './Image/large.webp';
import im from '../imagr/icons8-apple-24.png'

function HomePage() {
    useEffect(() => {
        // Disable scrolling on mount
        document.body.style.overflow = 'hidden';
        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div>
            <div className="text-center mt-19 pt-10 text-white">
                <div className="flex justify-center items-center">
                    <img src={im} alt="Logo" className="h-8 w-8" />
                    <span className="ml-3 text-2xl font-semibold">Music</span>
                </div>
                <h1 className="text-4xl font-bold mt-1">Discover new music every day.</h1>
                <p className="mt-4 text-lg mb-0">Get playlists and albums inspired by the artists and </p>
                <p className=" text-lg">genres you’re listening to. 1 month free, then </p>
                <p className="text-lg">$10.99/month.</p>
                <button className="bg-red-500 text-white px-6 py-3 mt-4 rounded-full">Try It Free</button><br /><br />
                <a href='https://www.apple.com/apple-music/' target='_blank' >Learn More </a>
            </div>
            <img src={IM} alt="Main content" className="mt-3 mx-auto" />
        </div>
    );
}

export default HomePage;
