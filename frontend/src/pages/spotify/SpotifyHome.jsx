import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '../../components/cards/Card';
import SpotifyProfile from './SpotifyProfile';
import SpotifyPlaylists from './SpotifyPlaylists';

const SpotifyHome = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [url, setUrl] = useState(`${import.meta.env.VITE_LOCAL_SERVER}`);
    const getUser = async () => {
        let response = await fetch(`${url}/api/spotify/profile`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        response = await response.json();
        if (response && response.success)
            setUser(response.profile);
    }
    const loadPlaylists = async () => {
        console.log('redirecting to playlists page')
        navigate('/spotifyPlaylists');
    }
    useEffect(() => {
        console.log('user updated: ', user);
    }, [user])
    useEffect(() => {
        getUser();
    }, [])
    return (
        <>
            <div className='print-on-black'>User details are fetched</div>
            <div className='print-on-black'>name: {user?.display_name}</div>
            <div className='print-on-black'>email: {user?.email}</div>
            <div className='print-on-black'>spotify_url: {user?.external_urls?.spotify}</div>
            <div className='print-on-black'>followers: {user?.followers?.total}</div>
            <div className='print-on-black'>id: {user.id}</div>
            <div><button className='btn btn-primary' onClick={loadPlaylists}>Playlists</button></div>
        </>
    )
}

export default SpotifyHome