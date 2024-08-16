import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './blur.css'

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/';

    useEffect(() => {
        document.body.classList.add('blur-background');
        return () => {
            document.body.classList.remove('blur-background');
        };
    }, []);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const headers = {
            'Content-Type': 'application/json',
            'projectID': 'u0kdju5bps0g'
        };
    
        if (isLogin) {
            try {
                const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        email,
                        password,
                        appType: 'music'
                    })
                });
                const data = await response.json();
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('name', data.data.user.name);
                navigate(from, { replace: true });
                window.location.reload();
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        appType: 'music'
                    })
                });
                const data = await response.json();
                console.log("hello ", data)
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('name', data.data.user.name);
                setSuccess('Registration successful! Please log in.');
                setIsLogin(true);
                navigate(from, { replace: true });
                window.location.reload();
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="reset-password-modal">
            <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md mt-20 relative z-10">
                <button onClick={handleClose} className="absolute mb-4 font-semibold top-2 right-2 text-gray-600 hover:text-red-600">
                    X
                </button>
                <div className="flex mb-4">
                    <button
                        className={`flex-1 py-2 ${isLogin ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 py-2 ${!isLogin ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Register'}</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
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
                    )}
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
                        <label htmlFor="password" className="block font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border p-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md w-full">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <p className="mt-4 text-center">
                    {isLogin ? (
                        <>
                            Don't have an account?
                            <button onClick={toggleForm} className="text-green-600 ml-2">Register</button>
                        </>
                    ) : (
                        <>
                            Already have an account?
                            <button onClick={toggleForm} className="text-green-600 ml-2">Login</button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default AuthForm;