import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-toastify';
import SongList from '../../components/lists/SongList';
import { useNavigate } from 'react-router-dom';

const SpotifyAddSongs = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [songsList, setSongsList] = useState([]);
    let url = import.meta.env.VITE_LOCAL_SERVER;
    if (import.meta.env.PROD) {
        url = import.meta.env.VITE_DEPLOYED_SERVER;
    }
    const addSong = async () => {
        console.log('song Id: ', id);
        let response = await fetch(`${url}/api/spotify/fetchSong/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        console.log(response);
        if (!response.status) {
            toast.error('Song not found with provided id');
            return;
        }
        let songs = sessionStorage.getItem('songsToAdd');
        console.log(songs);
        if (songs)
            songs = songs + ',' + id;
        else {
            songs = id;
        }
        console.log(songs);
        sessionStorage.setItem('songsToAdd', songs);
        toast.success('Song found successfully');
        setId('');
        updateSongs();
    }
    const changeId = async (e) => {
        setId(e.target.value);
    }
    const updateSongs = async () => {
        let songs = sessionStorage.getItem('songsToAdd');
        songs = songs?.split(',');
        console.log(songs);
        const data = await Promise.all(songs?.map(async (item) => {
            try {
                let response = await fetch(`${url}/api/spotify/fetchSong/${item}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json'
                    }
                });

                response = await response.json();

                if (!response.status) {
                    return { id: item, name: 'Not found' };
                } else {
                    return { id: item, name: response.name };
                }
            } catch (error) {
                console.error('Error fetching song:', error);
                return { id: item, name: 'Error' };
            }
        }));

        console.log(data);
        setSongsList(data);
    }
    const back = async () => {
        sessionStorage.removeItem('songsToAdd');
        navigate('/spotifyPlaylists');
    }
    const save = async () => {
        try {
            const playlistId = sessionStorage.getItem('playlistId');
            if (!playlistId) {
                throw new Error("PlaylistId not found");
            }
            let songs = sessionStorage.getItem('songsToAdd');
            songs = songs?.split(',');
            const body = [];
            songs?.forEach(element => {
                body.push('spotify:track:' + element);
            });
            let response = await fetch(`${url}/api/spotify/addSongs/${playlistId}`, {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    song_uris: body
                })
            })
            response = await response.json();
            console.log(response);
            if (response.success) {
                toast.success('Songs loaded to playlist successfully');
                sessionStorage.removeItem('songsToAdd');
                navigate('/spotifyPlaylists');
                return;
            }
            toast.error("Couldn't load songs to playlists");
            return;
        } catch (error) {
            console.log('error catched while saving songs to playlist in spotifyAddSongs.jsx: ', error);
            return;
        }
    }
    useEffect(() => {
        updateSongs();
    }, [])
    useEffect(() => {
        console.log('Songs list is updated: ', songsList);
    }, [songsList])
    return (
        <>
            <div className='print-on-black playlist-input-container' style={{ margin: "1rem" }}>
                <InputGroup className="mb-3 playlist-input" onChange={changeId}>
                    <InputGroup.Text id="inputGroup-sizing-default" >
                        Song Id
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default" value={id}
                    />
                </InputGroup>
                <div>
                    <button className='btn btn-primary playlist-input-buttons' onClick={addSong}>Add Song</button>
                </div>
            </div>
            <div className='print-on-black'>
                {songsList?.map((item, index) => (
                    < SongList key={item?.id} id={item?.id} name={item?.name} index={index} />
                    // <>hi</>
                ))}
            </div>
            <div>
                <button className='btn btn-primary playlist-input-buttons' onClick={back}>Back</button>
                <button className='btn btn-success playlist-input-buttons' onClick={save}>Load to playlist</button>
            </div>
        </>
    )
}

export default SpotifyAddSongs