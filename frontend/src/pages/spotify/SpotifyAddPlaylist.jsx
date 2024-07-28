import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SpotifyAddPlaylist = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('Sample Playlist');
    const [description, setDescription] = useState('...');
    let url = import.meta.env.VITE_LOCAL_SERVER;
    if (import.meta.env.PROD) {
        url = import.meta.env.VITE_DEPLOYED_SERVER;
    }
    const changeName = async (e) => {
        setName(e.target.value);
    }
    const changeDescription = async (e) => {
        setDescription(e.target.value);
    }
    const addPlaylist = async () => {
        let response = await fetch(`${url}/api/spotify/addPlaylist`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playlist_name: name,
                playlist_description: description
            })
        });
        response = await response.json();
        console.log(response);
        if (response.success) {
            toast.success(response.message);
            navigate('/spotifyPlaylists');
        } else {
            toast.error(response.message);
        }
    }
    const back = async () => {
        console.log('Going back to playlists page');
        navigate('/spotifyPlaylists');
    }
    return (
        <div className='print-on-black playlist-input-container'>
            <InputGroup className="mb-3 playlist-input" onChange={changeName}>
                <InputGroup.Text id="inputGroup-sizing-default" >
                    Name
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <Form.Group className="mb-3 playlist-input" controlId="exampleForm.ControlTextarea1" onChange={changeDescription}>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <div className=''>
                <button className='btn btn-primary playlist-input-buttons' onClick={back}>Back</button>
                <button className='btn btn-success playlist-input-buttons' onClick={addPlaylist}>Add Playlist</button>
            </div>
        </div>
    )
}

export default SpotifyAddPlaylist 