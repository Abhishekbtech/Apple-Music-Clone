const API_URL = 'https://academics.newtonschool.co/api/v1/user';

const headers = {
    'Content-Type': 'application/json',
    'projectID': 'u0kdju5bps0g'
};

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            email,
            password,
            appType: 'music'
        })
    });
    return response.json();
};

export const signup = async (name, email, password) => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name,
            email,
            password,
            appType: 'music'
        })
    });
    return response.json();
};

export const updatePassword = async ( email, passwordCurrent, passwordNew) => {
    const response = await fetch(`${API_URL}/updateMyPassword`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            email,
            passwordCurrent,
            password: passwordNew,
            appType: 'music'
        })
    });
    return response.json();
};