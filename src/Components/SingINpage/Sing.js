import React, { useState, useEffect } from 'react';
import { login, signup, updatePassword } from './Api';

function Sing({ isOpen, onClose, onLogin, onLogout }) {
    const [activeForm, setActiveForm] = useState("signin");
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        passwordCurrent: '',
        passwordNew: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setActiveForm('postlogin');
        }
    }, []);

    const handleFormSwitch = (form) => {
        setActiveForm(form);
        setMessage('');
        setFormData({
            email: '',
            password: '',
            name: '',
            passwordCurrent: '',
            passwordNew: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const { email, password, passwordCurrent, passwordNew } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Invalid email format.';
        }
        if (activeForm === 'signin' || activeForm === 'signup') {
            if (password.length < 6) {
                return 'Password must be at least 6 characters long.';
            }
        }
        if (activeForm === 'forgotpassword') {
            if (passwordCurrent.length < 6 || passwordNew.length < 6) {
                return 'Passwords must be at least 6 characters long.';
            }
        }
        return '';
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const validationMessage = validateForm();
        if (validationMessage) {
            setMessage(validationMessage);
            return;
        }
        try {
            const data = await login(formData.email, formData.password);
            sessionStorage.setItem('token', data.token);
            setActiveForm('postlogin');
            onLogin();
        } catch (error) {
            console.error('Error:', error);
            setMessage('Login failed. Please try again.');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const validationMessage = validateForm();
        if (validationMessage) {
            setMessage(validationMessage);
            return;
        }
        try {
            await signup(formData.name, formData.email, formData.password);
            setMessage('');
            setActiveForm('signin');
        } catch (error) {
            console.error('Error:', error);
            setMessage('Sign up failed. Please try again.');
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        const validationMessage = validateForm();
        if (validationMessage) {
            setMessage(validationMessage);
            return;
        }
        try {
            await updatePassword(formData.name, formData.email, formData.passwordCurrent, formData.passwordNew);
            setMessage('');
        } catch (error) {
            console.error('Error:', error);
            setMessage('Password update failed. Please try again.');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setMessage('');
        setActiveForm('signin');
        onLogout();
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? "visible" : "invisible"}`}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="backdrop-blur-25 backdrop-saturate-200 bg-black bg-opacity-20 rounded-12 border border-gray-400 border-opacity-30 p-8 rounded shadow-lg z-1000 relative text-black">
                <div className="relative">
                    <button className="absolute top-0 right-0 text-white hover:text-red-900 font-bold" onClick={onClose}>
                        X
                    </button>
                </div>
                {/* {message && <p className="text-center text-red-500 mb-4">{message}</p>} */}
                {activeForm === "signin" && (
                    <form className="mb-4 mt-10" onSubmit={handleSignIn}>
                        <h2 className="text-lg font-semibold mb-4 text-center text-white">Sign In</h2>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 rounded border border-gray-300 mb-2"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded border border-gray-300 mb-2"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Sign In
                        </button>
                        <p className="mt-2 text-sm text-center text-white">
                            Don't have an account?{" "}
                            <button type="button" className="text-blue-500" onClick={() => handleFormSwitch("signup")}>
                                Sign Up
                            </button>
                        </p>
                    </form>
                )}
                {activeForm === "signup" && (
                    <form className='mt-10' onSubmit={handleSignUp}>
                        <h2 className="text-lg font-semibold mb-4 text-center text-white">Sign Up</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-full px-4 py-2 rounded border border-gray-300 mb-2"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 rounded border border-gray-300 mb-2"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded border border-gray-300 mb-2"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            Sign Up
                        </button>
                        <p className="mt-2 text-sm text-center">
                            Already have an account?{" "}
                            <button type="button" className="text-blue-500" onClick={() => handleFormSwitch("signin")}>
                                Sign In
                            </button>
                        </p>
                    </form>
                )}
                {activeForm === "forgotpassword" && (
                    <form className='mt-10' onSubmit={handlePasswordReset}>
                        <h2 className="text-lg font-semibold mb-4 text-center">Reset Password</h2>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 rounded border border-none bg-gray-100 mb-2"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="passwordCurrent"
                            placeholder="Current Password"
                            className="w-full px-4 py-2 rounded border border-gray-300 mb-2"
                            value={formData.passwordCurrent}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="passwordNew"
                            placeholder="New Password"
                            className="w-full px-4 py-2 rounded border border-gray-300 mb-2"
                            value={formData.passwordNew}
                            onChange={handleChange}
                        />
                        <button type="submit" className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                            Reset Password
                        </button>
                    </form>
                )}
                {activeForm === "postlogin" && (
                    <div className="text-center mt-10">
                        <p className="text-lg font-semibold mb-4">You are logged in!</p>
                        <button
                            className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                            onClick={() => handleFormSwitch("forgotpassword")}
                        >
                            Go to Reset Password
                        </button>
                        <button
                            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sing;