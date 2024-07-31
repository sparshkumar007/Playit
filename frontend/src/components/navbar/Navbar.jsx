import React from 'react'
import NavbarLogo from '../../assets/Navbar-logo.png';
import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark playit-navbar">
                <a className="navbar-brand" href="">
                    <img src={NavbarLogo} width="30" height="30" className="d-inline-block align-top" alt="" />
                    &nbsp;PlayIt
                </a>
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/spotify">Spotify</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/lastfm">LastFm</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/spotifyAuth">Authenticate Spotify</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/lastfmAuth">Authenticate LastFm</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar