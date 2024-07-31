import React, { useEffect, useState } from 'react'
import SongList from '../../components/lists/SongList'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SpotifySongs = () => {
    const navigate = useNavigate();
    let url = import.meta.env.VITE_LOCAL_SERVER;
    if (import.meta.env.PROD) {
        url = import.meta.env.VITE_DEPLOYED_SERVER;
    }
    const [songs, setSongs] = useState([]);
    const loadSongs = async () => {
        try {
            const playlistId = sessionStorage.getItem('playlistId');
            let response = await fetch(`${url}/api/spotify/fetchSongs/${playlistId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            response = await response.json();
            console.log(response.data);
            setSongs(response.data);
        } catch (error) {
            console.log("Error while fetching songs for current playlist");
        }
    }
    const addSongs = async () => {
        navigate('/spotifyAddSongs');
    }
    useEffect(() => {
        loadSongs();
    }, [])
    useEffect(() => {
        console.log('songs are updated: ', songs);
    }, [songs])
    return (
        <>
            <div className='print-on-black'>SpotifySongs</div>
            <div>
                <button className='btn btn-warning' style={{ marginBottom: '1rem' }} onClick={addSongs}>Add Songs</button>
            </div >
            <div>
                {songs.map((item, index) => (
                    <SongList key={item.id} id={item.id} name={item.name} handleClick={() => { handleClick(item.id) }} index={index} />
                ))}
            </div>
        </>

    )
}

export default SpotifySongs