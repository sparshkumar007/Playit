import React, { useEffect, useState } from 'react'
import { MD5 } from 'crypto-js'
const LastfmHome = () => {
    const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
    const MY_SECRET = import.meta.env.VITE_LASTFM_SECRET;
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
            headers: {
                token: token
            }
        })
        response = await response.json();
        console.log(response);
    }
    useEffect(() => {
        handle();
    }, [])
    return (
        <div className='print-on-black'>
            LastfmHome
            <div>
                {token}
                {/* {api_sig} */}
            </div>
        </div>
    )
}

export default LastfmHome