import React, { useEffect, useState } from 'react'
import SongList from '../../components/lists/SongList'

const SpotifySongs = () => {
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
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            response = await response.json();
            console.log(response.data);
            setSongs(response.data);
        } catch (error) {
            console.log("Error while fetching songs for current playlist");
        }
    }
    useEffect(() => {
        loadSongs();
    }, [])
    useEffect(() => {
        console.log('songs are updated: ', songs);
    }, [songs

    ])
    return (
        <>
            <div className='print-on-black'>SpotifySongs</div>
            {songs.map((item, index) => (
                <SongList key={item.id} id={item.id} name={item.name} handleClick={() => { handleClick(item.id) }} index={index} />
            ))}
        </>

    )
}

export default SpotifySongs