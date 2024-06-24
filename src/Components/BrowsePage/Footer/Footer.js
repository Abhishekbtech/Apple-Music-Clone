import React from 'react';

const Footer = () => {
    return (
        <footer className="text-white">
            <div className="max-w-7xl mx-auto py-6 px-4">
                <div className="flex justify-center space-x-4">
                    <a href="#" className="hover:underline">United States</a>
                    <a href="#" className="hover:underline">Español (México)</a>
                    <a href="#" className="hover:underline">العربية</a>
                    <a href="#" className="hover:underline">Русский</a>
                    <a href="#" className="hover:underline">简体中文</a>
                    <a href="#" className="hover:underline">Français (France)</a>
                    <a href="#" className="hover:underline">한국어</a>
                    <a href="#" className="hover:underline">Português (Brazil)</a>
                    <a href="#" className="hover:underline">Tiếng Việt</a>
                    <a href="#" className="hover:underline">繁體中文 (台灣)</a>
                </div>
                <div className="mt-6 text-center text-xs">
                    <p>Copyright © 2024 Apple Inc. All rights reserved.</p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <a href="#" className="hover:underline">Internet Service Terms</a>
                        <a href="#" className="hover:underline">Apple Music & Privacy</a>
                        <a href="#" className="hover:underline">Cookie Warning</a>
                        <a href="#" className="hover:underline">Support</a>
                        <a href="#" className="hover:underline">Feedback</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;