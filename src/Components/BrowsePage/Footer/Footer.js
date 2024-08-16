import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
    const handleLinkClick = () => {
        toast.info("Under Construction");
    };

    return (
        <footer className="text-white mb-11">
            <div className="max-w-7xl mx-auto py-6 px-4">
                <div className="flex flex-wrap justify-center space-x-4 space-y-2 sm:space-y-0 sm:space-x-4">
                    <span onClick={handleLinkClick} className="hover:underline cursor-pointer">United States</span>
                    <span onClick={handleLinkClick} className="hover:underline cursor-pointer">Español (México)</span>
                    <span onClick={handleLinkClick} className="hover:underline cursor-pointer">العربية</span>
                    <span onClick={handleLinkClick} className="hover:underline cursor-pointer">Русский</span>
                    <span onClick={handleLinkClick} className="hover:underline cursor-pointer">简体中文</span>
                    <span onClick={handleLinkClick} className="hover:underline cursor-pointer">Français (France)</span>
                    <span onClick={handleLinkClick} className="hover:underline cursor-pointer">한국어</span>
                    <span onClick={handleLinkClick} className="hover:underline cursor-pointer">Português (Brazil)</span>
                    <span onClick={handleLinkClick} className="hover:underline cursor-pointer">Tiếng Việt</span>
                    <span onClick={handleLinkClick} className="hover:underline cursor-pointer">繁體中文 (台灣)</span>
                </div>
                <div className="mt-6 text-center text-xs">
                    <p>Copyright © 2024 Apple Inc. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center space-x-4 space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                        <span onClick={handleLinkClick} className="hover:underline cursor-pointer">Internet Service Terms</span>
                        <span onClick={handleLinkClick} className="hover:underline cursor-pointer">Apple Music & Privacy</span>
                        <span onClick={handleLinkClick} className="hover:underline cursor-pointer">Cookie Warning</span>
                        <span onClick={handleLinkClick} className="hover:underline cursor-pointer">Support</span>
                        <span onClick={handleLinkClick} className="hover:underline cursor-pointer">Feedback</span>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </footer>
    );
};

export default Footer;