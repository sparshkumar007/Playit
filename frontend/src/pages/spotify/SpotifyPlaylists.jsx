import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '../../components/cards/Card';

const SpotifyPlaylists = () => {
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    let url = import.meta.env.VITE_LOCAL_SERVER;
    if (import.meta.env.PROD) {
        url = import.meta.env.VITE_DEPLOYED_SERVER;
    }
    const getPlaylists = async () => {
        const data = [];
        let response = await fetch(`${url}/api/spotify/fetchPlaylists`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        response = await response.json();
        setPlaylists(response.data || []);
    }
    const handleClick = async (id) => {
        console.log('Navigating to spotifySongs fromspotifyPlaylists after setting playlist id in sessionStorage');
        sessionStorage.setItem('playlistId', id);
        console.log('Session storage value playlistId: ', sessionStorage.getItem('playlistId'));
        navigate('/spotifySongs')
        // write code to load songs page
    }
    const addPlaylist = async () => {
        console.log('addPlaylist called...');
        navigate('/spotifyAddPlaylist');
    }
    useEffect(() => {
        sessionStorage.removeItem('playlistId');
        getPlaylists();
    }, [])
    useEffect(() => {
        console.log('Playlists updated:', playlists);
    }, [playlists]);
    return (
        <>
            <div className='print-on-black'>Playlists</div>
            <div>
                <button className='btn btn-primary' onClick={addPlaylist}>Add Playlist</button>
            </div>
            <div className='playlist-container'>
                {playlists.map(item => (
                    <Card key={item.id} id={item.id} name={item.name} handleClick={() => { handleClick(item.id) }} />
                ))}
            </div>
        </>
    )
}

export default SpotifyPlaylists