import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './blur.css'

const ResetPassword = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('blur-background');
        return () => {
            document.body.classList.remove('blur-background');
        };
    }, []);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const headers = {
            'Content-Type': 'application/json',
            'projectID': 'u0kdju5bps0g'
        };

        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/updateMyPassword', {
                method: 'PATCH',
                headers,
                body: JSON.stringify({
                    name,
                    email,
                    passwordCurrent: currentPassword,
                    password: newPassword,
                    appType: 'music'
                })
            });

            if (response.ok) {
                setSuccess('Password reset successful! Please log in with your new password.');
            } else {
                setError('Password reset failed. Please check your details and try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="reset-password-modal">
            <div className="reset-password-container max-w-md mx-auto bg-white p-8 shadow-md rounded-md mt-20 relative">
                <button onClick={handleClose} className="absolute font-semibold top-2 right-2 text-gray-600 hover:text-red-600">
                    X
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center">Update Password</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}

                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="currentPassword" className="block font-semibold mb-2">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="border p-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block font-semibold mb-2">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border p-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md w-full">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;