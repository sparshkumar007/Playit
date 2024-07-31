import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LastfmCallback = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('Loading...');
    let url = import.meta.env.VITE_LOCAL_SERVER;
    if (import.meta.env.PROD) {
        url = import.meta.env.VITE_DEPLOYED_SERVER;
    }
    const [token, setToken] = useState('');
    const handle = async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('token');
        setToken(token);
        let response = await fetch(`${url}/api/lastfm/getSessionToken`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                token: token
            }
        })
        console.log(response);
        if (response.ok) {
            setMessage('Authentication Successful');
        } else {
            setMessage('Authentication Unsuccessful');
        }
    }
    useEffect(() => {
        handle();
    }, [])
    return (
        <div className='print-on-black'>
            LastfmCallback
            <div>
                <div>{message}</div>
                <button type="button" className="btn btn-primary" onClick={() => { navigate('/lastfm') }}>Home</button>
            </div>
        </div>
    )
}

export default LastfmCallback