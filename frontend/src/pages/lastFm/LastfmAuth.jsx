import React from 'react'


const LastfmAuth = () => {
    const handleClick = async () => {
        const url = "http://www.last.fm/api/auth/?api_key=4c0f6e8c54def1d02b8c5746ab7aae9e&cb=http://localhost:5173/lastfm";
        window.location.href = url;
    }
    return (
        <div className='print-on-black'>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Autenticate</button>
        </div>
    )
}

export default LastfmAuth