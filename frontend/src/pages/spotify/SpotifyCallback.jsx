import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SpotifyCallback = () => {
    let url = import.meta.env.VITE_LOCAL_SERVER;
    if (import.meta.env.PROD) {
        url = import.meta.env.VITE_DEPLOYED_SERVER;
    }
    const navigate = useNavigate();
    const [message, setMessage] = useState('Loading...');
    const [timeLeft, setTimeLeft] = useState(5);
    const handle = async () => {
        const authToken = localStorage.getItem('authToken');
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const response = await fetch(`${url}/api/spotify/fetchAccessToken?code=${code}&state=${state}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        const res = await response.json();
        console.log(res);
        if (res.success) {
            setMessage('Authentication Successful');
        } else {
            setMessage('Authentication Unsuccessful');
        }
    }
    useEffect(() => {
        handle();
    }, [])
    return (
        <>
            <div>{message}</div>
            <button type="button" className="btn btn-primary" onClick={() => { navigate('/spotify') }}>Home</button>
        </>
    )
}

export default SpotifyCallback